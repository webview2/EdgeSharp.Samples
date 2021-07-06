using EdgeSharp.Core;
using EdgeSharp.Core.Configuration;
using EdgeSharp.Core.Infrastructure;
using EdgeSharp.Core.Network;
using EdgeSharp.Shared.Models;

namespace EdgeSharp.Shared.ActionControllers
{
    [ActionController(Name = "HomeActionController", Description = "Home controller")]
    public class HomeActionController : ActionController
    {
        private readonly IConfiguration _config;

        public HomeActionController(IConfiguration config)
        {
            _config = config;
        }

        [ActionRoute(Path = "/info")]
        public Info GetInfo()
        {
            return  new Info
            {
                SdkVersion = _config.SdkVersion ?? VersionInfo.SdkVersion,
                RuntimeVersion = _config?.RuntimeVersion
            };
        }

        [ActionRoute(Path = "/reload")]
        public void Reload()
        {
            Dispatcher.Browser.Execute(DisapatcherExecuteType.Reload);
        }

        [ActionRoute(Path = "/exit")]
        public void Exit()
        {
            Dispatcher.Browser.Execute(DisapatcherExecuteType.Exit);
        }
    }
}
