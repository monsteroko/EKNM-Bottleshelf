using EKNM_Bottleshelf.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EKNM_Bottleshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiquidsTableController : ControllerBase
    {
        ContextBH db;
        public LiquidsTableController(ContextBH context)
        {
            db = context;
        }

        // Request to liquids for all cocktails
        //GET api/LiquidsTable
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LiquidsTable>>> Get()
        {
            return await db.LiquidsTable.ToListAsync();
        }

        //Request to add cocktail liquid
        // POST api/LiquidsTable
        [HttpPost]
        public async Task<ActionResult<LiquidsTable>> Post(LiquidsTable component)
        {
            if (component == null)
            {
                return BadRequest();
            }

            db.LiquidsTable.Add(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }

        //Request to delete all cocktail liquids
        // DELETE api/LiquidsTable/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<LiquidsTable>>> Delete(int id)
        {
            List<LiquidsTable> allcomponents = await db.LiquidsTable.ToListAsync();
            if (allcomponents == null)
                return NotFound();
            List<LiquidsTable> coctailLiquids = new List<LiquidsTable>();
            foreach (LiquidsTable liquid in allcomponents)
            {
                if (liquid.CockId == id)
                    coctailLiquids.Remove(liquid);
            }
            return new ObjectResult(coctailLiquids);
        }
    }
}
