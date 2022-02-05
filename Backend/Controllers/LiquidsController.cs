#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EKNM_Bottleshelf.Models;

namespace EKNM_Bottleshelf.Controllers
{
    public class LiquidsController : Controller
    {
        private readonly ContextBH _context;

        public LiquidsController(ContextBH context)
        {
            _context = context;
        }

        // GET: Liquids
        public async Task<IActionResult> Index()
        {
            return View(await _context.Liquids.ToListAsync());
        }

        // GET: Liquids/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var liquid = await _context.Liquids
                .FirstOrDefaultAsync(m => m.Id == id);
            if (liquid == null)
            {
                return NotFound();
            }

            return View(liquid);
        }

        // GET: Liquids/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Liquids/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Volume,Degree,Id,Name,Price,Description,Amount")] Liquid liquid)
        {
            if (ModelState.IsValid)
            {
                _context.Add(liquid);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(liquid);
        }

        // GET: Liquids/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var liquid = await _context.Liquids.FindAsync(id);
            if (liquid == null)
            {
                return NotFound();
            }
            return View(liquid);
        }

        // POST: Liquids/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Volume,Degree,Id,Name,Price,Description,Amount")] Liquid liquid)
        {
            if (id != liquid.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(liquid);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LiquidExists(liquid.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(liquid);
        }

        // GET: Liquids/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var liquid = await _context.Liquids
                .FirstOrDefaultAsync(m => m.Id == id);
            if (liquid == null)
            {
                return NotFound();
            }

            return View(liquid);
        }

        // POST: Liquids/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var liquid = await _context.Liquids.FindAsync(id);
            _context.Liquids.Remove(liquid);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LiquidExists(int id)
        {
            return _context.Liquids.Any(e => e.Id == id);
        }
    }
}
