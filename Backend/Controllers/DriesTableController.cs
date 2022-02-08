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
            AddInitDriesTable();
        }

        // Request to dries for all cocktails
        //GET api/DriesTable
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriesTable>>> Get()
        {
            return await db.DriesTable.ToListAsync();
        }

        // Request to get coctail dries (cocktail 5 for example)
        // GET api/DriesTable/5 
        [HttpGet("{id}")]
        public async Task<ActionResult<List<DriesTable>>> Get(int id)
        {
            List<DriesTable> allcomponents = await db.DriesTable.ToListAsync();
            if (allcomponents == null)
                return NotFound();
            List<DriesTable> coctailDries = new List<DriesTable>();
            foreach(DriesTable dry in allcomponents)
            {
                if(dry.CockId == id)
                    coctailDries.Add(dry);
            }
            return new ObjectResult(coctailDries);
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

        //Add cocktails dries (TEST FEATURE)
        public void AddInitDriesTable()
        {
            if (!db.DriesTable.Any())
            {
                db.DriesTable.Add(new DriesTable { CockId = 1, DryId = 1, Amount = 1 });
                db.DriesTable.Add(new DriesTable { CockId = 2, DryId = 2, Amount = 1 });
                db.DriesTable.Add(new DriesTable { CockId = 4, DryId = 4, Amount = 1 });
                db.DriesTable.Add(new DriesTable { CockId = 5, DryId = 3, Amount = 1 });
                db.SaveChanges();
            }
        }
    }
}
