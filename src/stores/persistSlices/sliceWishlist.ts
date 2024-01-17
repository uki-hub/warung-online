import WishlistModel from "../../models/WishlistModel";
import { ImmerStateCreator } from "../../abstractions/BaseStore";

export interface WishlistStore {
  wishlist: WishlistModel[];
}

export interface WishlistSlice {
  WishlistStore: WishlistStore;

  wishlist_getWishlistById: (id: number) => WishlistModel;
  wishlist_getWishlistIndexById: (id: number) => number;

  wishlist_wish: (wishlist: WishlistModel) => void;
  wishlist_clear: (id: number) => void;
}

export const createWishlistSlice: ImmerStateCreator<WishlistSlice> = (set, get) => ({
  WishlistStore: {
    wishlist: [],
  },
  wishlist_getWishlistById: (id) => {
    const { wishlist } = get().WishlistStore;

    return wishlist.find((c) => c.productId == id)!;
  },
  wishlist_getWishlistIndexById: (id) => {
    const { wishlist } = get().WishlistStore;

    return wishlist.findIndex((c) => c.productId == id);
  },
  wishlist_wish: (wishlist) => {
    const wishlistIndex = get().wishlist_getWishlistIndexById(wishlist.productId);

    set((state) => {
      if (wishlistIndex == -1) {
        state.WishlistStore.wishlist.push(wishlist);
      } else {
        const updatedWishlist = state.WishlistStore.wishlist.filter((w) => w.productId != wishlist.productId);

        state.WishlistStore.wishlist = updatedWishlist;
      }
    });
  },

  wishlist_clear: (id) => {
    const { wishlist } = get().WishlistStore;

    const filteredWishlists = wishlist.filter((c) => id != c.productId);

    set((state) => {
      state.WishlistStore.wishlist = filteredWishlists;
    });
  },
});
