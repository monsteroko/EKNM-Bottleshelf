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
        public async Task<ActionResult<IEnumerable<LiquidDTO>>> Get()
        {
            List<LiquidDTO> liqs = new List<LiquidDTO>();
            List<Liquid> liquids = await db.Liquids.ToListAsync();
            liquids.ForEach(component =>
            {
                LiquidDTO liq = new LiquidDTO();
                liq.Id = component.Id;
                liq.Name = component.Name;
                liq.Volume = component.Volume;
                liq.Amount = component.Amount;
                liq.Price = component.Price;
                liq.Degree = component.Degree;
                liq.Description = component.Description;
                liq.Bottles = Math.Round((double)(component.Amount / component.Volume));
                liqs.Add(liq);
            });
            return liqs;
        }

        //Get liquid component
        // GET api/Liquids/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LiquidDTO>> Get(int id)
        {
            LiquidDTO liq = new LiquidDTO();
            Liquid component = await db.Liquids.FirstOrDefaultAsync(x => x.Id == id);
            if (component == null)
                return NotFound();
            else
            {
                liq.Id=component.Id;
                liq.Name=component.Name;
                liq.Volume=component.Volume;
                liq.Amount = component.Amount;
                liq.Price = component.Price;
                liq.Degree = component.Degree;
                liq.Description = component.Description;
                liq.Bottles = Math.Round((double)(component.Amount / component.Volume));
            }
            return new ObjectResult(liq);
        }

        //Get all running out liquids
        // GET api/Liquids/buy
        [HttpGet("buy")]
        public async Task<ActionResult<IEnumerable<LiquidDTO>>> GetRunningOut()
        {
            List<LiquidDTO> liqs = new List<LiquidDTO>();
            List<Liquid> liquids = await db.Liquids.ToListAsync();
            liquids.ForEach(component =>
            {
                if (Math.Round((double)(component.Amount / component.Volume)) <= 1)
                {
                    LiquidDTO liq = new LiquidDTO();
                    liq.Id = component.Id;
                    liq.Name = component.Name;
                    liq.Volume = component.Volume;
                    liq.Amount = component.Amount;
                    liq.Price = component.Price;
                    liq.Degree = component.Degree;
                    liq.Description = component.Description;
                    liq.Bottles = Math.Round((double)(component.Amount / component.Volume));
                    liqs.Add(liq);
                }
            });
            return liqs;
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
            List<LiquidsTable> liqtable = await db.LiquidsTable.Where(x => x.LiqId == id).ToListAsync();
            if (liqtable.Count()==0)
            {
                db.Liquids.Remove(component);
                await db.SaveChangesAsync();
                return Ok(component);
            }
            return BadRequest();
        }
    }
}
