using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Data;
using PasswordManager.Models;
using System.Text.RegularExpressions;

namespace PasswordManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordRecordsController : ControllerBase
    {
        private readonly PasswordContext _context;

        public PasswordRecordsController(PasswordContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PasswordRecord>>> GetPasswordRecords()
        {
            return await _context.PasswordRecords.OrderByDescending(p => p.DateCreated).ToListAsync();
        }
        
        [HttpPost]
        public async Task<ActionResult<PasswordRecord>> PostPasswordRecord(PasswordRecord passwordRecord)
        {
            if (_context.PasswordRecords.Any(p => p.Name == passwordRecord.Name))
            {
                return Conflict("Запись с таким именем уже существует.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (passwordRecord.Type == "email" && !IsValidEmail(passwordRecord.Name))
            {
                return BadRequest("Неверный адрес электронной почты.");
            }

            passwordRecord.DateCreated = DateTime.UtcNow;
            passwordRecord.IsPasswordVisible = false;
            _context.PasswordRecords.Add(passwordRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPasswordRecords), new { id = passwordRecord.Id }, passwordRecord);
        }

        [HttpPatch("{id}/toggle-visibility")]
        public async Task<IActionResult> TogglePasswordVisibility(int id)
        {
            var record = await _context.PasswordRecords.FindAsync(id);

            if (record == null)
            {
                return NotFound();
            }
                        
            record.IsPasswordVisible = !record.IsPasswordVisible;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<PasswordRecord>>> SearchPasswordRecords(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return await GetPasswordRecords();
            }

            var result = await _context.PasswordRecords
                .Where(p => p.Name.Contains(query, StringComparison.OrdinalIgnoreCase))
                .OrderByDescending(p => p.DateCreated)
                .ToListAsync();

            return result;
        }

        private bool IsValidEmail(string email)
        {
            return Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        }
    }
}
