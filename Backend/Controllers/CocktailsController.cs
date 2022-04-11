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
        public async Task<ActionResult<IEnumerable<CocktailDTO>>> Get()
        {
            List<CocktailDTO> cocktailsDTOs = new List<CocktailDTO>();
            List<Cocktail> cocktails = await db.Cocktails.ToListAsync();
            List<LiquidsTable> allLiquids = await db.LiquidsTable.ToListAsync();
            cocktails.ForEach(element =>
            {
                List<LiquidsTable> cocktailLiqs = allLiquids.Where(x => x.CockId == element.Id).ToList();
                CocktailDTO cocktail = new CocktailDTO();
                cocktail.Id = element.Id;
                cocktail.Name = element.Name;
                cocktail.Description = element.Description;
                cocktailLiqs.ForEach(ingridient => {
                    cocktail.VolumeML += ingridient.Amount;
                });
                cocktailsDTOs.Add(cocktail);
            });
            return cocktailsDTOs;
        }

        //Get cocktails by size
        //Get api/Cocktails/size/1
        [HttpGet("size/{id}")]
        public async Task<ActionResult<IEnumerable<CocktailDTO>>> GetSize(int id)
        {
            List<CocktailDTO> cocktailsDTOs = new List<CocktailDTO>();
            List<Cocktail> cocktails = await db.Cocktails.ToListAsync();
            List<LiquidsTable> allLiquids = await db.LiquidsTable.ToListAsync();
            cocktails.ForEach(element =>
            {
                List<LiquidsTable> cocktailLiqs = allLiquids.Where(x => x.CockId == element.Id).ToList();
                CocktailDTO cocktail = new CocktailDTO();
                cocktail.Id = element.Id;
                cocktail.Name = element.Name;
                cocktail.Description = element.Description;
                cocktailLiqs.ForEach(ingridient => {
                    cocktail.VolumeML += ingridient.Amount;
                });
                switch (id)
                {
                    case 0:
                        cocktailsDTOs.Add(cocktail);
                        break;
                    case 1:
                        if (cocktail.VolumeML < 60)
                            cocktailsDTOs.Add(cocktail);
                        break;
                    case 2:
                        if(cocktail.VolumeML>=60 && cocktail.VolumeML<=160)
                            cocktailsDTOs.Add(cocktail);
                        break;
                    case 3:
                        if (cocktail.VolumeML > 160)
                            cocktailsDTOs.Add(cocktail);
                        break;
                    default:
                        break;
                }
            });
            return cocktailsDTOs;
        }

        // Get one cocktail
        // GET api/Cocktails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CocktailDTO>> Get(int id)
        {
            List<LiquidsTable> allLiquids = await db.LiquidsTable.Where(x => x.CockId == id).ToListAsync();
            CocktailDTO cocktail= new CocktailDTO();
            Cocktail component = await db.Cocktails.FirstOrDefaultAsync(x => x.Id == id);
            if (component == null)
                return NotFound();
            cocktail.Id = component.Id;
            cocktail.Name = component.Name;
            cocktail.Description = component.Description;
            if (allLiquids != null)
            {
                allLiquids.ForEach(ingridient =>
                {
                    cocktail.VolumeML += ingridient.Amount;
                });
            }
            return new ObjectResult(cocktail);
        }

        // Get cocktail recipe
        // GET api/Cocktails/5/recipe
        [HttpGet("{id}/recipe")]
        public async Task<List<RecipeDTO>> GetRecipe(int id)
        {
            List<RecipeDTO> recipes = new List<RecipeDTO>();
            List<DriesTable> allDries = await db.DriesTable.Where(x => x.CockId == id).ToListAsync();
            List<LiquidsTable> allLiquids = await db.LiquidsTable.Where(x => x.CockId == id).ToListAsync();
            if ((allDries != null) && (allLiquids != null))
            {
                allDries.ForEach(ingridient =>
                {
                    Dry dryIngridient = db.Dries.FirstOrDefault(dry => dry.Id == ingridient.DryId);

                    recipes.Add(new RecipeDTO
                    {
                        Name = dryIngridient?.Name,
                        Amount = ingridient.Amount,
                        IsSolid = true
                    });
                });
                allLiquids.ForEach(ingridient =>
                {
                    Liquid liquidIngridient = db.Liquids.FirstOrDefault(liq => liq.Id == ingridient.LiqId);

                    recipes.Add(new RecipeDTO
                    {
                        Name = liquidIngridient?.Name,
                        Amount = ingridient.Amount,
                        IsSolid = false
                    });
                });
            }
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
            if ((allDries != null) && (allLiquids != null))
            {
                allDries.ForEach(ingridient =>
                {
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
                allLiquids.ForEach(ingridient =>
                {
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
            }
            return Math.Round(price,2);
        }

        // Get cocktail degrees
        // GET api/Cocktails/5/degrees
        [HttpGet("{id}/degree")]
        public async Task<double> GetDegrees(int id)
        {
            double totalvol = 0;
            double alcovol = 0;
            double degrees = 0;
            List<LiquidsTable> allLiquids = await db.LiquidsTable.Where(x => x.CockId == id).ToListAsync();
            if (allLiquids != null)
            {
                allLiquids.ForEach(ingridient =>
                {
                    Liquid liquidIngridient = db.Liquids.FirstOrDefault(liq => liq.Id == ingridient.LiqId);
                    if (liquidIngridient.Degree == 0)
                    {
                        totalvol += ingridient.Amount;
                    }
                    else
                    {
                        totalvol += ingridient.Amount;
                        alcovol += liquidIngridient.Degree / 100 * ingridient.Amount;
                    }
                });
                degrees = alcovol / totalvol * 100;
            }
            return Math.Round(degrees, 2);
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
            if ((allDries != null) && (allLiquids != null))
            {
                allDries.ForEach(ingridient =>
                {
                    Dry dryIngridient = db.Dries.FirstOrDefault(dry => dry.Id == ingridient.DryId);
                    if (dryIngridient.Amount < ingridient.Amount)
                    {
                        enoughcomponents = false;
                    }
                });
                allLiquids.ForEach(ingridient =>
                {
                    Liquid liquidIngridient = db.Liquids.FirstOrDefault(liq => liq.Id == ingridient.LiqId);
                    if (liquidIngridient.Amount < ingridient.Amount)
                    {
                        enoughcomponents = false;
                    }
                });
                if (enoughcomponents)
                {
                    allDries.ForEach(ingridient =>
                    {
                        Dry dryIngridient = db.Dries.FirstOrDefault(dry => dry.Id == ingridient.DryId);
                        dryIngridient.Amount = dryIngridient.Amount - ingridient.Amount;
                    });
                    allLiquids.ForEach(ingridient =>
                    {
                        Liquid liquidIngridient = db.Liquids.FirstOrDefault(liq => liq.Id == ingridient.LiqId);
                        liquidIngridient.Amount = liquidIngridient.Amount - ingridient.Amount;
                    });
                    return "Cooked";
                }
                if (!enoughcomponents)
                {
                    return "No components";
                }
            }
            return BadRequest();
        }

        // Delete ingridient
        // DELETE api/Cocktails/5/ingridient/garlic
        [HttpDelete("{id}/ingridient/{name}")]
        public async Task<ActionResult<Cocktail>> Delete(int id, string name)
        {
            Cocktail component = db.Cocktails.FirstOrDefault(x => x.Id == id);
            if (component == null)
            {
                return NotFound();
            }
            List<DriesTable> allDries = await db.DriesTable.Where(x => x.CockId == id).ToListAsync();
            List<LiquidsTable> allLiquids = await db.LiquidsTable.Where(x => x.CockId == id).ToListAsync();
            if ((allDries != null) && (allLiquids != null))
            {
                Dry dry = db.Dries.FirstOrDefault(ingridient => ingridient.Name == name);
                if (dry != null)
                {
                    allDries.ForEach(drycomp =>
                    {
                        if ((drycomp.DryId == dry.Id) && (drycomp.CockId == component.Id))
                            db.DriesTable.Remove(drycomp);
                    });
                }
                Liquid liquid = db.Liquids.FirstOrDefault(ingridient => ingridient.Name == name);
                if (liquid != null)
                {
                    allLiquids.ForEach(liqcomp =>
                    {
                        if ((liqcomp.LiqId == liquid.Id) && (liqcomp.CockId == component.Id))
                            db.LiquidsTable.Remove(liqcomp);
                    });
                }
            }
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
            List<DriesTable> allDries = await db.DriesTable.Where(x => x.CockId == id).ToListAsync();
            List<LiquidsTable> allLiquids = await db.LiquidsTable.Where(x => x.CockId == id).ToListAsync();
            db.DriesTable.RemoveRange(allDries);
            db.LiquidsTable.RemoveRange(allLiquids);
            db.Cocktails.Remove(component);
            await db.SaveChangesAsync();
            return Ok(component);
        }
    }
}
