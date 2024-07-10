using System.ComponentModel.DataAnnotations;

namespace PasswordManager.Models
{
    public class PasswordRecordCreateDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "Пароль должен быть длиной не менее 8 символов.")]
        public string Password { get; set; }

        [Required]
        [RegularExpression("^(site|email)$", ErrorMessage = "Тип должен быть 'site' или 'email'.")]
        public string Type { get; set; }
    }
}
