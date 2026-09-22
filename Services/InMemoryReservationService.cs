using noodle_flow_ramen.Models;

namespace noodle_flow_ramen.Services
{
    public class InMemoryReservationService : IReservationService
    {
        private readonly List<ReservationViewModel> _reservations = new();

        public string CreateReservation(ReservationViewModel reservation)
        {
            var code = "RAMEN-" + Random.Shared.Next(10000, 99999);
            reservation.ConfirmationCode = code;
            reservation.CreatedAt = DateTime.Now;
            _reservations.Add(reservation);
            return code;
        }

        public IEnumerable<ReservationViewModel> GetAll() => _reservations;

        public ReservationViewModel? GetByCode(string code)
        {
            return _reservations.FirstOrDefault(r => r.ConfirmationCode != null && r.ConfirmationCode.Equals(code, StringComparison.OrdinalIgnoreCase));
        }
    }
}
