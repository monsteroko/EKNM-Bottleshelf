using EKNM_Bottleshelf.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EKNM_Bottleshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CocktailsController : ControllerBase
    {
        ContextBH db;
        public CocktailsController(ContextBH context)
        {
            db = context;
            /*if (!db.Cocktails.Any())
            {
                db.Cocktails.Add(new Cocktail { Name = "Koritsa", Amount = 1, Weight = 10, Description = "Eto koritsa?", Price = 30, Id = 1 });
                db.Cocktails.Add(new Cocktail { Name = "Sahar", Amount = 1, Weight = 1000, Description = "Sladkoe", Price = 28, Id = 2 });
                db.SaveChanges();
            }*/
        }
        // GET api/Cocktails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cocktail>>> Get()
        {
            return await db.Cocktails.ToListAsync();
        }

        // GET api/Cocktails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cocktail>> Get(int id)
        {
            Cocktail component = await db.Cocktails.FirstOrDefaultAsync(x => x.Id == id);
            if (component == null)
                return NotFound();
            return new ObjectResult(component);
        }

        // POST api/Cocktails
        [HttpPost]
        public async Task<ActionResult<Cocktail>> Post(Cocktail component)
        {
            if (component == null)
            {
                return BadRequest();
            }

            db.Cocktails.Add(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        // PUT api/Cocktails/
        [HttpPut]
        public async Task<ActionResult<Cocktail>> Put(Cocktail component)
        {
            if (component == null)
            {
                return BadRequest();
            }
            if (!db.Cocktails.Any(x => x.Id == component.Id))
            {
                return NotFound();
            }

            db.Update(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        // DELETE api/Cocktails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Cocktail>> Delete(int id)
        {
            Cocktail component = db.Cocktails.FirstOrDefault(x => x.Id == id);
            if (component == null)
            {
                return NotFound();
            }
            db.Cocktails.Remove(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }
    }
}
