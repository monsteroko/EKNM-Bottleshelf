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
        }

        // Get list of all dries
        // GET api/Dries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DryDTO>>> Get()
        {
            List<DryDTO> dries = new List<DryDTO>();
            List<Dry> components = await db.Dries.ToListAsync();
            components.ForEach(component =>
            {
                DryDTO dry = new DryDTO();
                dry.Id = component.Id;
                dry.Name = component.Name;
                dry.Weight = component.Weight;
                dry.Amount = component.Amount;
                dry.Price = component.Price;
                dry.Description = component.Description;
                dry.Packs = Math.Round((double)(component.Amount / component.Weight));
                dries.Add(dry);
            });
            return dries;
        }

        //Get all running out dries
        // GET api/Dries/buy
        [HttpGet("buy")]
        public async Task<ActionResult<IEnumerable<DryDTO>>> GetRunningOut()
        {
            List<DryDTO> dries = new List<DryDTO>();
            List<Dry> components = await db.Dries.ToListAsync();
            components.ForEach(component =>
            {
                if (Math.Round((double)(component.Amount / component.Weight)) <= 1)
                {
                    DryDTO dry = new DryDTO();
                    dry.Id = component.Id;
                    dry.Name = component.Name;
                    dry.Weight = component.Weight;
                    dry.Amount = component.Amount;
                    dry.Price = component.Price;
                    dry.Description = component.Description;
                    dry.Packs = Math.Round((double)(component.Amount / component.Weight));
                    dries.Add(dry);
                }
            });
            return dries;
        }

        // Get dry component
        // GET api/Dries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DryDTO>> Get(int id)
        {
            DryDTO dry = new DryDTO();
            Dry component = await db.Dries.FirstOrDefaultAsync(x => x.Id == id);
            if (component == null)
                return NotFound();
            else
            {
                dry.Id = component.Id;
                dry.Name = component.Name;
                dry.Weight = component.Weight;
                dry.Amount = component.Amount;
                dry.Price = component.Price;
                dry.Description = component.Description;
                dry.Packs = Math.Round((double)(component.Amount / component.Weight));
            }
            return new ObjectResult(dry);
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
        [HttpPut("{id}")]
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
    }
}
