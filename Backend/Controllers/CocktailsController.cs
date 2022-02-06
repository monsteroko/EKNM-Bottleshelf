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
            AddInitCocktails();
        }

        // Get all cocktails
        // GET api/Cocktails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cocktail>>> Get()
        {
            return await db.Cocktails.ToListAsync();
        }

        // Get one cocktail
        // GET api/Cocktails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cocktail>> Get(int id)
        {
            Cocktail component = await db.Cocktails.FirstOrDefaultAsync(x => x.Id == id);
            if (component == null)
                return NotFound();
            return new ObjectResult(component);
        }

        // Add cocktail
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

        //Update cocktail
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

        // Delete coctail
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

        //Add list of coctails (TEST FEATURE)
        public void AddInitCocktails()
        {
            if (!db.Cocktails.Any())
            {
                db.Cocktails.Add(new Cocktail { Name = "Чесночный дрифт", Description = "Шот, пить залпом, чеснок по вкусу", VolumeML= 50 });
                db.Cocktails.Add(new Cocktail { Name = "Супер лонг", Description = "Супер лонг, пить не спеша, тиктак желательно не мятный", VolumeML = 500 });
                db.Cocktails.Add(new Cocktail { Name = "Аперона", Description = "Лонг, пить не спеша, подавать с колотым льдом", VolumeML = 200 });
                db.Cocktails.Add(new Cocktail { Name = "Грибок", Description = "Шот, пить залпом, смешивание Rainbow", VolumeML = 50 });
                db.Cocktails.Add(new Cocktail { Name = "Жемчуг пролетария", Description = "Шот, пить залпом, предпочтительно с ягодами и горохом, возможны замены", VolumeML = 50 });
                db.SaveChanges();
            }
        }
    }
}
