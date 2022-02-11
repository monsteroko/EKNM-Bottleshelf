using EKNM_Bottleshelf.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace EKNM_Bottleshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriesTableController : ControllerBase
    {
        ContextBH db;
        public DriesTableController(ContextBH context)
        {
            db = context;
        }

        // Request to dries for all cocktails
        //GET api/DriesTable
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriesTable>>> Get()
        {
            return await db.DriesTable.ToListAsync();
        }

        //Request to add cocktail dry
        // POST api/DriesTable
        [HttpPost]
        public async Task<ActionResult<DriesTable>> Post(DriesTable component)
        {
            if (component == null)
            {
                return BadRequest();
            }

            db.DriesTable.Add(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        //Request to delete all cocktail dries
        // DELETE api/DriesTable/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<DriesTable>>> Delete(int id)
        {
            List<DriesTable> allcomponents = await db.DriesTable.ToListAsync();
            if (allcomponents == null)
                return NotFound();
            List<DriesTable> coctailDries = new List<DriesTable>();
            foreach (DriesTable dry in allcomponents)
            {
                if (dry.CockId == id)
                    coctailDries.Remove(dry);
            }
            return new ObjectResult(coctailDries);
        }
    }
}
