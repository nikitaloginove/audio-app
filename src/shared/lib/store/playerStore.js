import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
  tracks: [],
  currentTrackIndex: 0,
  isPlaying: false,
  volume: 0.8,
  progress: 0,
  duration: 0,

  setTracks: (tracks) => set({ tracks }),
  selectTrack: (index) => set({
    currentTrackIndex: index,
    progress: 0,
    isPlaying: true,
  }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (vol) => set({ volume: vol }),
  setProgress: (prog) => set({ progress: prog }),
  setDuration: (dur) => set({ duration: dur }),
  nextTrack: () => {
    const { tracks, currentTrackIndex } = get();
    if (tracks.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    set({ currentTrackIndex: nextIdx, progress: 0, isPlaying: true });
  },
  prevTrack: () => {
    const { tracks, currentTrackIndex } = get();
    if (tracks.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    set({ currentTrackIndex: prevIdx, progress: 0, isPlaying: true });
  },
}));