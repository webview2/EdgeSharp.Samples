using EdgeSharp.Core.Configuration;
using EdgeSharp.Shared.ActionControllers;
using EdgeSharp.Shared.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace EdgeSharp.Wpf.Sample
{
    public class Startup : WpfStartup
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
            services.AddLogging(configure => configure.AddConsole());
            services.AddLogging(configure => configure.AddFile("Logs/serilog-{Date}.txt", LogLevel.Information));

            services.AddSingleton<IConfiguration, SampleConfig>();
            services.AddScoped<MovieContext>();

            RegisterActionControllerAssembly(services, typeof(MoviesActionController).Assembly);
        }

        public override void Initialize(IServiceProvider serviceProvider)
        {
            base.Initialize(serviceProvider);
            serviceProvider.InitializeDb();
        }
    }
}
