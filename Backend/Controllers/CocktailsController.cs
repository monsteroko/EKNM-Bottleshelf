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

        // Get cocktail recipe
        // GET api/Cocktails/5/recipe
        [HttpGet("{id}/recipe")]
        public async Task<List<RecipeDTO>> GetRecipe(int id)
        {
            List<RecipeDTO> recipes = new List<RecipeDTO>();
            List<DriesTable> allDries = await db.DriesTable.Where(x => x.CockId == id).ToListAsync();
            List<LiquidsTable> allLiquids = await db.LiquidsTable.Where(x => x.CockId == id).ToListAsync();
            allDries.ForEach(ingridient => {
                Dry dryIngridient = db.Dries.FirstOrDefault(dry => dry.Id == ingridient.DryId);

                recipes.Add(new RecipeDTO
                {
                    Name = dryIngridient?.Name,
                    Amount = ingridient.Amount,
                    IsSolid = true
                });
                });
            allLiquids.ForEach(ingridient => {
                Liquid liquidIngridient = db.Liquids.FirstOrDefault(liq => liq.Id == ingridient.LiqId);

                recipes.Add(new RecipeDTO
                {
                    Name = liquidIngridient?.Name,
                    Amount = ingridient.Amount,
                    IsSolid = false
                });
            });
            return recipes;
        }

        // Get cocktail price
        // GET api/Cocktails/5/price
        [HttpGet("{id}/price")]
        public async Task<double> GetPrice(int id)
        {
            double price = 0;
            List<DriesTable> allDries = await db.DriesTable.Where(x => x.CockId == id).ToListAsync();
            List<LiquidsTable> allLiquids = await db.LiquidsTable.Where(x => x.CockId == id).ToListAsync();
            allDries.ForEach(ingridient => {
                Dry dryIngridient = db.Dries.FirstOrDefault(dry => dry.Id == ingridient.DryId);
                if (dryIngridient.Weight != null)
                {
                    price += dryIngridient.Price / (double)dryIngridient.Weight * ingridient.Amount;
                }
                else
                {
                    price += dryIngridient.Price * ingridient.Amount;
                }
            });
            allLiquids.ForEach(ingridient => {
                Liquid liquidIngridient = db.Liquids.FirstOrDefault(liq => liq.Id == ingridient.LiqId);
                if (liquidIngridient.Volume != 0)
                {
                    price += liquidIngridient.Price / (double)liquidIngridient.Volume * ingridient.Amount;
                }
                else
                {
                    price += liquidIngridient.Price * ingridient.Amount;
                }
            });
            return Math.Round(price,2);
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
        // PUT api/Cocktails/5
        [HttpPut("{id}")]
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

        //Cook cocktail
        // PUT api/Cocktails/5/cook
        [HttpPut("{id}/cook")]
        public async Task<ActionResult<string>> Cook(int id)
        {
            bool enoughcomponents = true;
            List<DriesTable> allDries = await db.DriesTable.Where(x => x.CockId == id).ToListAsync();
            List<LiquidsTable> allLiquids = await db.LiquidsTable.Where(x => x.CockId == id).ToListAsync();
            allDries.ForEach(ingridient => {
                Dry dryIngridient = db.Dries.FirstOrDefault(dry => dry.Id == ingridient.DryId);
                if (dryIngridient.Amount < ingridient.Amount)
                {
                    enoughcomponents = false;
                }
            });
            allLiquids.ForEach(ingridient => {
                Liquid liquidIngridient = db.Liquids.FirstOrDefault(liq => liq.Id == ingridient.LiqId);
                if (liquidIngridient.Amount < ingridient.Amount)
                {
                    enoughcomponents = false;
                }
            });
            if (enoughcomponents)
            {
                allDries.ForEach(ingridient => {
                    Dry dryIngridient = db.Dries.FirstOrDefault(dry => dry.Id == ingridient.DryId);
                    dryIngridient.Amount = dryIngridient.Amount - ingridient.Amount;
                });
                allLiquids.ForEach(ingridient => {
                    Liquid liquidIngridient = db.Liquids.FirstOrDefault(liq => liq.Id == ingridient.LiqId);
                    liquidIngridient.Amount = liquidIngridient.Amount - ingridient.Amount;
                });
                return "Cooked";
            }
            if (!enoughcomponents)
            {
                return "No components";
            }
            return BadRequest();
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
    }
}
