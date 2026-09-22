using System.ComponentModel.DataAnnotations;

namespace noodle_flow_ramen.Models
{
    public class ReservationViewModel
    {
        [Required(ErrorMessage = "El nombre completo es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre no puede exceder los 100 caracteres.")]
        [Display(Name = "Nombre Completo")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
        [EmailAddress(ErrorMessage = "Por favor introduce un correo válido.")]
        [Display(Name = "Correo Electrónico")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "El teléfono de contacto es obligatorio.")]
        [Phone(ErrorMessage = "Por favor introduce un número telefónico válido.")]
        [Display(Name = "Teléfono")]
        public string Phone { get; set; } = string.Empty;

        [Required(ErrorMessage = "Indica el número de comensales.")]
        [Range(1, 12, ErrorMessage = "Para reservas de 1 a 12 personas. Para grupos mayores, contáctanos directamente.")]
        [Display(Name = "Número de Personas")]
        public int GuestCount { get; set; } = 2;

        [Required(ErrorMessage = "Selecciona la fecha de reserva.")]
        [DataType(DataType.Date)]
        [Display(Name = "Fecha")]
        public DateTime ReservationDate { get; set; } = DateTime.Today;

        [Required(ErrorMessage = "Selecciona el horario.")]
        [Display(Name = "Horario")]
        public string ReservationTime { get; set; } = "19:30";

        [Display(Name = "Preferencia de Mesa o Solicitudes Especiales")]
        [StringLength(300, ErrorMessage = "Las observaciones no deben superar 300 caracteres.")]
        public string? SpecialRequests { get; set; }

        public string? ConfirmationCode { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
