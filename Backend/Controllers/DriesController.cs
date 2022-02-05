using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EKNM_Bottleshelf.Models;

namespace EKNM_Bottleshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriesController : ControllerBase
    {
        ContextBH db;
        public DriesController(ContextBH context)
        {
            db = context;
            if (!db.Dries.Any())
            {
                db.Dries.Add(new Dry {Name="Koritsa", Amount=1, Weight=10, Description="Eto koritsa?", Price=30,Id=1 });
                db.Dries.Add(new Dry { Name = "Sahar", Amount = 1, Weight = 1000, Description = "Sladkoe", Price = 28, Id=2 });
                db.SaveChanges();
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dry>>> Get()
        {
            return await db.Dries.ToListAsync();
        }

        // GET api/Dries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Dry>> Get(int id)
        {
            Dry component = await db.Dries.FirstOrDefaultAsync(x => x.Id == id);
            if (component == null)
                return NotFound();
            return new ObjectResult(component);
        }

        // POST api/Dries
        [HttpPost]
        public async Task<ActionResult<Dry>> Post(Dry component)
        {
            if (component == null)
            {
                return BadRequest();
            }

            db.Dries.Add(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        // PUT api/Dries/
        [HttpPut]
        public async Task<ActionResult<Dry>> Put(Dry component)
        {
            if (component == null)
            {
                return BadRequest();
            }
            if (!db.Dries.Any(x => x.Id == component.Id))
            {
                return NotFound();
            }

            db.Update(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        // DELETE api/Dries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Dry>> Delete(int id)
        {
            Dry component = db.Dries.FirstOrDefault(x => x.Id == id);
            if (component == null)
            {
                return NotFound();
            }
            db.Dries.Remove(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }
    }
}
