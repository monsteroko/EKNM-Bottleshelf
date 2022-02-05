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
    public class DriesController : Controller
    {
        private readonly ContextBH _context;

        public DriesController(ContextBH context)
        {
            _context = context;
        }

        // GET: Dries
        public async Task<IActionResult> Index()
        {
            return View(await _context.Dries.ToListAsync());
        }

        // GET: Dries/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dry = await _context.Dries
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dry == null)
            {
                return NotFound();
            }

            return View(dry);
        }

        // GET: Dries/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Dries/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Weight,Id,Name,Price,Description,Amount")] Dry dry)
        {
            if (ModelState.IsValid)
            {
                _context.Add(dry);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(dry);
        }

        // GET: Dries/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dry = await _context.Dries.FindAsync(id);
            if (dry == null)
            {
                return NotFound();
            }
            return View(dry);
        }

        // POST: Dries/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Weight,Id,Name,Price,Description,Amount")] Dry dry)
        {
            if (id != dry.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dry);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DryExists(dry.Id))
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
            return View(dry);
        }

        // GET: Dries/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dry = await _context.Dries
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dry == null)
            {
                return NotFound();
            }

            return View(dry);
        }

        // POST: Dries/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var dry = await _context.Dries.FindAsync(id);
            _context.Dries.Remove(dry);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DryExists(int id)
        {
            return _context.Dries.Any(e => e.Id == id);
        }
    }
}
