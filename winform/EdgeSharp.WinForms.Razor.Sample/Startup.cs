using EdgeSharp.Core;
using EdgeSharp.Core.Owin;
using EdgeSharp.Shared.ActionControllers;
using EdgeSharp.Shared.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;

namespace EdgeSharp.WinForms.Razor.Sample
{
    public class Startup : OwinAppStartup
    {
        public Startup()
            : base(new CoreServices())
        {
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
            services.AddControllersWithViews();

            services.AddLogging(configure => configure.AddConsole());
            services.AddLogging(configure => configure.AddFile("Logs/edgesharp_serilog-{Date}.txt", LogLevel.Information));

            services.AddSingleton<Core.Configuration.IConfiguration, SampleConfig>();
            services.AddSingleton<IBrowserWindow, SampleBrowserForm>();

            services.AddScoped<MovieContext>();

            RegisterActionControllerAssembly(services, typeof(MoviesActionController).Assembly);
        }

        public override void Configure(IConfigurationBuilder configBuilder)
        {
        }

        public override void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            ErrorHandlingPath = "/Home/Error";

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                            Path.Combine(env.ContentRootPath, "assets")),
                            RequestPath = "/assets"
            });

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        public override void Configure(IWebHostBuilder builder)
        {
            builder
                .UseContentRoot(Directory.GetCurrentDirectory());
        }

        public override void Configure(IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    services.InitializeDb();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Startup>>();
                    logger.LogError(ex, "An error occurred seeding the DB.");
                }
            }
        }
    }
}
