import getListings from "@/actions/get-listings";
import EmptyState from "@/components/empty-state";
import PropertyClient from "./property-client";
import getCurrentUser from "@/actions/get-current-user";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="You are not logged in"
        subtitle="Please login to view your properties"
      />
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="You have not added any properties yet"
      />
    );
  }

  return <PropertyClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
