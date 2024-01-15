import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { ConfirmationModalSlice, createConfirmationModalSlice } from "./appSlices/sliceConfirmationModal";
import { PageLoginSlice, createPageLoginSlice } from "./appSlices/slicePageLogin";
import { PageBerandaSlice, createPageBerandaSlice } from "./appSlices/slicePageBeranda";
import { PageBarangSlice, createPageBarangSlice } from "./appSlices/slicePageBarang";
import { PageKeranjangSlice, createPageKeranjangSlice } from "./appSlices/slicePageKeranjangStore";

type Stores = ConfirmationModalSlice & PageLoginSlice & PageBerandaSlice & PageBarangSlice & PageKeranjangSlice;

const useApp = create<Stores>()(
  immer((...a) => ({
    ...createConfirmationModalSlice(...a),

    ...createPageLoginSlice(...a),
    ...createPageBerandaSlice(...a),
    ...createPageBarangSlice(...a),
    ...createPageKeranjangSlice(...a),
  }))
);

export default useApp;
