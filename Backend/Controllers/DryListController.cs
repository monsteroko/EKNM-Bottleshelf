using EKNM_Bottleshelf.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace EKNM_Bottleshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DryListController : ControllerBase
    {
        ContextBH db;
        public DryListController(ContextBH context)
        {
            db = context;
            AddInitDrylist();
        }

        // Request to dries for all cocktails
        //GET api/DryList
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DryList>>> Get()
        {
            return await db.DryList.ToListAsync();
        }

        // Request to get coctail dries (cocktail 5 for example)
        // GET api/DryList/5 
        [HttpGet("{id}")]
        public async Task<ActionResult<List<DryList>>> Get(int id)
        {
            List<DryList> allcomponents = await db.DryList.ToListAsync();
            if (allcomponents == null)
                return NotFound();
            List<DryList> coctailDries = new List<DryList>();
            foreach(DryList dry in allcomponents)
            {
                if(dry.CockId == id)
                    coctailDries.Add(dry);
            }
            return new ObjectResult(coctailDries);
        }

        //Request to add cocktail dry
        // POST api/DryList
        [HttpPost]
        public async Task<ActionResult<DryList>> Post(DryList component)
        {
            if (component == null)
            {
                return BadRequest();
            }

            db.DryList.Add(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        //Request to delete all cocktail dries
        // DELETE api/DryList/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<DryList>>> Delete(int id)
        {
            List<DryList> allcomponents = await db.DryList.ToListAsync();
            if (allcomponents == null)
                return NotFound();
            List<DryList> coctailDries = new List<DryList>();
            foreach (DryList dry in allcomponents)
            {
                if (dry.CockId == id)
                    coctailDries.Remove(dry);
            }
            return new ObjectResult(coctailDries);
        }

        //Add cocktails dries (TEST FEATURE)
        public void AddInitDrylist()
        {
            if (!db.DryList.Any())
            {
                db.DryList.Add(new DryList { CockId = 1, DryId = 1, Amount = 1});
                db.DryList.Add(new DryList { CockId = 2, DryId = 2, Amount = 1 });
                db.DryList.Add(new DryList { CockId = 4, DryId = 4, Amount = 1 });
                db.DryList.Add(new DryList { CockId = 5, DryId = 3, Amount = 1 });
                db.SaveChanges();
            }
        }
    }
}
