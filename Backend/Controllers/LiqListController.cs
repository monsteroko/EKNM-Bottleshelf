using EKNM_Bottleshelf.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EKNM_Bottleshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiqListController : ControllerBase
    {
        ContextBH db;
        public LiqListController(ContextBH context)
        {
            db = context;
            AddInitLiqList();
        }

        // Request to liquids for all cocktails
        //GET api/LiqList
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LiqList>>> Get()
        {
            return await db.LiqList.ToListAsync();
        }

        // Request to get coctail liquids (cocktail 5 for example)
        // GET api/LiqList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<LiqList>>> Get(int id)
        {
            List<LiqList> allcomponents = await db.LiqList.ToListAsync();
            if (allcomponents == null)
                return NotFound();
            List<LiqList> coctailLiquids = new List<LiqList>();
            foreach (LiqList liquid in allcomponents)
            {
                if (liquid.CockId == id)
                    coctailLiquids.Add(liquid);
            }
            return new ObjectResult(coctailLiquids);
        }

        //Request to add cocktail liquid
        // POST api/LiqList
        [HttpPost]
        public async Task<ActionResult<LiqList>> Post(LiqList component)
        {
            if (component == null)
            {
                return BadRequest();
            }

            db.LiqList.Add(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        //Request to delete all cocktail liquids
        // DELETE api/LiqList/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<LiqList>>> Delete(int id)
        {
            List<LiqList> allcomponents = await db.LiqList.ToListAsync();
            if (allcomponents == null)
                return NotFound();
            List<LiqList> coctailLiquids = new List<LiqList>();
            foreach (LiqList liquid in allcomponents)
            {
                if (liquid.CockId == id)
                    coctailLiquids.Remove(liquid);
            }
            return new ObjectResult(coctailLiquids);
        }

        //Add cocktails liquids (TEST FEATURE)
        public void AddInitLiqList()
        {
            if (!db.LiqList.Any())
            {
                db.LiqList.Add(new LiqList { CockId = 1, Amount = 25, LiqId = 2 });
                db.LiqList.Add(new LiqList { CockId = 1, Amount = 25, LiqId = 1 });
                db.LiqList.Add(new LiqList { CockId = 2, Amount = 150, LiqId = 3 });
                db.LiqList.Add(new LiqList { CockId = 2, Amount = 300, LiqId = 4 });
                db.LiqList.Add(new LiqList { CockId = 3, Amount = 100, LiqId = 5 });
                db.LiqList.Add(new LiqList { CockId = 3, Amount = 100, LiqId = 6 });
                db.LiqList.Add(new LiqList { CockId = 4, Amount = 25, LiqId = 7 });
                db.LiqList.Add(new LiqList { CockId = 4, Amount = 25, LiqId = 1 });
                db.LiqList.Add(new LiqList { CockId = 5, Amount = 25, LiqId = 1 });
                db.LiqList.Add(new LiqList { CockId = 5, Amount = 25, LiqId = 8 });
                db.SaveChanges();
            }
        }
    }
}
