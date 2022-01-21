using Microsoft.AspNetCore.Builder;
using EKNM_Bottleshelf.Models;
using Microsoft.Extensions.DependencyInjection;

namespace EKNM_Bottleshelf
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ContextBH>();
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseDeveloperExceptionPage();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
