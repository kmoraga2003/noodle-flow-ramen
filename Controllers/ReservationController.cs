using Microsoft.AspNetCore.Mvc;
using noodle_flow_ramen.Models;
using noodle_flow_ramen.Services;

namespace noodle_flow_ramen.Controllers
{
    public class ReservationController : Controller
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var model = new ReservationViewModel
            {
                ReservationDate = DateTime.Today.AddDays(1),
                ReservationTime = "19:30"
            };
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(ReservationViewModel model)
        {
            if (model.ReservationDate < DateTime.Today)
            {
                ModelState.AddModelError("ReservationDate", "La fecha de reserva no puede ser en el pasado.");
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var confirmationCode = _reservationService.CreateReservation(model);
            return RedirectToAction(nameof(Confirmation), new { code = confirmationCode });
        }

        [HttpGet]
        public IActionResult Confirmation(string code)
        {
            if (string.IsNullOrEmpty(code))
            {
                return RedirectToAction(nameof(Index));
            }

            var reservation = _reservationService.GetByCode(code);
            if (reservation == null)
            {
                return RedirectToAction(nameof(Index));
            }

            return View(reservation);
        }
    }
}
