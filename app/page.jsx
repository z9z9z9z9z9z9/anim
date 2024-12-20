import TrendingCarousel from "@/components/TrendingCarousel";
import RecentEpisodes from "@/components/RecentEpisodes";
import { Loader2 } from "lucide-react";

async function getTrendingAnime() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/top-airing`,
      {
        // Añade estas opciones
        cache: "no-store", // Deshabilita el caché para esta solicitud
        next: {
          revalidate: 0, // Fuerza a refrescar en cada solicitud
        },
      }
    );

    // Añade más logging
    if (!response.ok) {
      console.error("Detalles de la respuesta:", {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
      throw new Error("Failed to fetch trending anime");
    }

    return response.json();
  } catch (error) {
    console.error("Error detallado al obtener anime trending:", {
      message: error.message,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/anime/gogoanime/top-airing`,
    });
    return { results: [] };
  }
}

export default async function Home() {
  const trendingData = await getTrendingAnime();

  if (!trendingData.results) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 pt-20">
      <TrendingCarousel data={trendingData.results} />
      <RecentEpisodes />
    </div>
  );
}
