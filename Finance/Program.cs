using Finance.Models;
using Finance.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<FinanceDatabaseSettings>(
    builder.Configuration.GetSection("FinanceDatabase"));

builder.Services.AddSingleton<FinanceDatabaseSettings>();
builder.Services.AddSingleton<DespesaService>();
builder.Services.AddSingleton<ReceitaService>();
builder.Services.AddSingleton<CadContaService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options.AllowAnyOrigin();
    options.AllowAnyHeader();
    options.AllowAnyMethod();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
