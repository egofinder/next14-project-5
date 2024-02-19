import getCurrentUser from "@/actions/get-current-user";
import getFavoriteListings from "@/actions/get-favorite-listings";
import EmptyState from "@/components/empty-state";
import FavoritesClient from "./favorites-client";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (listings?.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="You don't have any favorites yet."
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
