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
            AddInitDries();
        }

        // Get list of all dries
        // GET api/Dries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dry>>> Get()
        {
            return await db.Dries.ToListAsync();
        }

        // Get dry component
        // GET api/Dries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Dry>> Get(int id)
        {
            Dry component = await db.Dries.FirstOrDefaultAsync(x => x.Id == id);
            if (component == null)
                return NotFound();
            return new ObjectResult(component);
        }

        // Add dry
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

        // Update dry component
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

        // Delete dry component
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


        //Add list of dries (TEST FEATURE)
        public void AddInitDries()
        {
            if (!db.Dries.Any())
            {
                db.Dries.Add(new Dry { Name = "Garlic", Amount = 3, Description = "Just garlic", Price = 10, Weight = 3});
                db.Dries.Add(new Dry { Name = "Tic Tac", Amount = 1, Description = "With minions", Price = 16.2, Weight = 16 });
                db.Dries.Add(new Dry { Name = "Canned Peas", Amount = 1, Description = "Bonduelle", Price = 56, Weight = 425 });
                db.Dries.Add(new Dry { Name = "Burger bun", Amount = 1, Description = "Hello McDonalds", Price = 46.62, Weight = 300 });
                db.SaveChanges();
            }
        }
    }
}
