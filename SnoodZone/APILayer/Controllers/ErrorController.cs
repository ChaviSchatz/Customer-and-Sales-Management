using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APILayer.Controllers
{
    [ApiController]
    public class ErrorController : ControllerBase
    {
        ILogger<ErrorsController> logger;
        public ErrorsController(ILogger<ErrorsController> logger)
        {
            this.logger = logger;
        }

        [Route("/error")]
        public ActionResult Error([FromServices] IHostEnvironment hostEnvironment)
        {
            var exceptionHandlerFeature =
                HttpContext.Features.Get<IExceptionHandlerFeature>();
            logger.LogError(exceptionHandlerFeature?.Error.ToString());

            return Problem(
                detail: "Please try later...",
                title: "Sorry...");

        }
        [Route("/error-development")]
        public ActionResult DevelopmentError([FromServices] IHostEnvironment hostEnvironment)
        {
            var exceptionHandlerFeature =
                HttpContext.Features.Get<IExceptionHandlerFeature>();
            logger.LogError(exceptionHandlerFeature?.Error.ToString());

            return Problem(
                detail: exceptionHandlerFeature.Error.StackTrace,
                title: exceptionHandlerFeature.Error.Message);

        }
    }
}
