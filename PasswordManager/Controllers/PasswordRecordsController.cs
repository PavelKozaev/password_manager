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

        // GET: api/PasswordRecords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PasswordRecord>>> GetPasswordRecords()
        {
            return await _context.PasswordRecords.OrderByDescending(p => p.DateCreated).ToListAsync();
        }

        // POST: api/PasswordRecords
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
            _context.PasswordRecords.Add(passwordRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPasswordRecords), new { id = passwordRecord.Id }, passwordRecord);
        }

        private bool IsValidEmail(string email)
        {
            return Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        }
    }
}
