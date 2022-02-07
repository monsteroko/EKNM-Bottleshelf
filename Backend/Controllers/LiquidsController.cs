using EKNM_Bottleshelf.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EKNM_Bottleshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiquidsController : ControllerBase
    {
        ContextBH db;
        public LiquidsController(ContextBH context)
        {
            db = context;
            AddInitLiquids();
        }

        //Get list of all liquids
        // GET api/Liquids
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Liquid>>> Get()
        {
            return await db.Liquids.ToListAsync();
        }

        //Get liquid component
        // GET api/Liquids/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Liquid>> Get(int id)
        {
            Liquid component = await db.Liquids.FirstOrDefaultAsync(x => x.Id == id);
            if (component == null)
                return NotFound();
            return new ObjectResult(component);
        }

        // Add liquid
        // POST api/Liquids
        [HttpPost]
        public async Task<ActionResult<Liquid>> Post(Liquid component)
        {
            if (component == null)
            {
                return BadRequest();
            }

            db.Liquids.Add(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        // Update liquid component
        // PUT api/Liquids/
        [HttpPut("{id}")]
        public async Task<ActionResult<Liquid>> Put(Liquid component)
        {
            if (component == null)
            {
                return BadRequest();
            }
            if (!db.Liquids.Any(x => x.Id == component.Id))
            {
                return NotFound();
            }

            db.Update(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        // Delete liquid component
        // DELETE api/Liquids/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Liquid>> Delete(int id)
        {
            Liquid component = db.Liquids.FirstOrDefault(x => x.Id == id);
            if (component == null)
            {
                return NotFound();
            }
            db.Liquids.Remove(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }


        //Add list of liquid (TEST FEATURE)
        public void AddInitLiquids()
        {
            if (!db.Liquids.Any())
            {
                db.Liquids.Add(new Liquid { Name = "Finlandia", Amount = 3, Degree = 40, Description = "Good vodka", Price = 259, Volume = 700 });
                db.Liquids.Add(new Liquid { Name = "EKNM Nafta", Amount = 1, Degree = 4.7, Description = "Dark beer from EKNM", Price = 28.5, Volume = 500 });
                db.Liquids.Add(new Liquid { Name = "Hlibniy Dar", Amount = 2, Degree = 40, Description = "Bad vodka", Price = 125.3, Volume = 700 });
                db.Liquids.Add(new Liquid { Name = "Coca-Cola", Amount = 6, Degree = 0, Description = "Classic coca-cola", Price = 25.5, Volume = 1500 });
                db.Liquids.Add(new Liquid { Name = "Corona Extra", Amount = 6, Degree = 4.5, Description = "Corona beer (family)", Price = 32, Volume = 330 });
                db.Liquids.Add(new Liquid { Name = "Aperol Aperetivo", Amount = 1, Degree = 11, Description = "Good aperetive", Price = 289, Volume = 700 });
                db.Liquids.Add(new Liquid { Name = "Limon juice Sandora", Amount = 2, Degree = 0, Description = "Just good juice", Price = 42.8, Volume = 500 });
                db.Liquids.Add(new Liquid { Name = "Children chanpagne", Amount = 1, Degree = 0, Description = "Just soup, with cars already", Price = 69, Volume = 750 });
                db.SaveChanges();
            }
        }
    }
}
