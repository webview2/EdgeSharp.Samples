using EdgeSharp.Shared.ActionControllers;
using EdgeSharp.Shared.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace EdgeSharp.Vue.Sample
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            AppBuilder
            .Create()
            .UseConfig<SampleConfig>()
            .UseWindow<SampleWindow>()
            .UseApp<SampleApp>()
            .Build()
            .Run(args);
        }
    }

    public class SampleApp : EdgeSharpApp
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
            services.AddLogging(configure => configure.AddConsole());
            services.AddLogging(configure => configure.AddFile("Logs/serilog-{Date}.txt", LogLevel.Information));

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
