using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APILayer.Controllers
{
    [ApiController]

    public class ErrorsController : ControllerBase
    {
        ILogger<ErrorsController> logger;
        public ErrorsController(ILogger<ErrorsController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
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

        [HttpGet]
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
