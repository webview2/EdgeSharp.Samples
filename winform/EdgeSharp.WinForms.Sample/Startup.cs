using EdgeSharp.Core;
using EdgeSharp.Core.Configuration;
using EdgeSharp.Shared.ActionControllers;
using EdgeSharp.Shared.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace EdgeSharp.WinForms.Sample
{
    public class Startup : WinFormsStartup
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
            services.AddLogging(configure => configure.AddConsole());
            services.AddLogging(configure => configure.AddFile("Logs/serilog-{Date}.txt", LogLevel.Information));

            services.AddSingleton<IConfiguration, SampleConfig>();
            services.AddScoped<MovieContext>();
            services.AddSingleton<IBrowserWindow, SampleBrowserForm>();

            RegisterActionControllerAssembly(services, typeof(MoviesActionController).Assembly);
        }

        public override void Initialize(IServiceProvider serviceProvider)
        {
            base.Initialize(serviceProvider);
            serviceProvider.InitializeDb();
        }
    }
}
