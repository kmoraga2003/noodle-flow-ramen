using noodle_flow_ramen.Models;

namespace noodle_flow_ramen.Services
{
    public interface IReservationService
    {
        string CreateReservation(ReservationViewModel reservation);
        IEnumerable<ReservationViewModel> GetAll();
        ReservationViewModel? GetByCode(string code);
    }
}
