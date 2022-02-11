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
    }
}
