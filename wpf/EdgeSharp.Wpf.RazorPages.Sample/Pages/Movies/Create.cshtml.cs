using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;
using EdgeSharp.Shared.Data;
using EdgeSharp.Shared.Models;

namespace EdgeSharp.Wpf.RazorPages.Sample.Pages.Movies
{
    public class CreateModel : PageModel
    {
        private readonly MovieContext _context;

        public CreateModel(MovieContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            //Movie = new Movie
            //{
            //    Genre = "Action",
            //    Price = 1.99m,
            //    ReleaseDate = DateTime.Now,
            //    Title = "Conan"
            //    , Rating = "R"
            //};
            return Page();
        }

        [BindProperty]
        public Movie Movie { get; set; }

        #region snippet
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Movie.Add(Movie);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
        #endregion
    }
}
