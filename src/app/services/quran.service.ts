import { ApiResponse, Surah, SurahDetail, TafsirDetail } from "@/app/types/quran";

const API_BASE_URL = process.env.NEXT_PUBLIC_QURAN_API;

export const getAllSurah = async (): Promise<ApiResponse<Surah[]>> => {
  const response = await fetch(`${API_BASE_URL}/surat`);
  if (!response.ok) {
    throw new Error("Failed to fetch surah list");
  }
  return response.json();
};

export const getSurahDetail = async (
  nomor: number
): Promise<ApiResponse<SurahDetail>> => {
  const response = await fetch(`${API_BASE_URL}/surat/${nomor}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch surah ${nomor}`);
  }
  return response.json();
};

export const getTafsir = async (
  nomor: number
): Promise<ApiResponse<TafsirDetail>> => {
  const response = await fetch(`${API_BASE_URL}/tafsir/${nomor}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tafsir for surah ${nomor}`);
  }
  return response.json();
};