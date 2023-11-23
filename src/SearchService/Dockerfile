#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app
EXPOSE 80

# Copy all .csproj files and restore as distinct layers. Use of the same COPY command for every dockerfile in the project to take advantage of Docker Caching
COPY CarAuctions.sln CarAuctions.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj

# Restore package dependencies
RUN dotnet restore CarAuctions.sln

# Copy the app folders over
COPY src/SearchService src/SearchService
COPY src/Contracts src/Contracts
WORKDIR /app/src/SearchService
RUN dotnet publish -c Release -o /app/src/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "SearchService.dll" ]


#FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
#WORKDIR /app
#EXPOSE 80
#
#FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
#WORKDIR /src
#COPY ["src/SearchService/SearchService.csproj", "src/SearchService/"]
#COPY ["src/Contracts/Contracts.csproj", "src/Contracts/"]
#RUN dotnet restore "src/SearchService/SearchService.csproj"
#COPY . .
#WORKDIR "/src/src/SearchService"
#RUN dotnet build "SearchService.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "SearchService.csproj" -c Release -o /app/publish /p:UseAppHost=false
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "SearchService.dll"]