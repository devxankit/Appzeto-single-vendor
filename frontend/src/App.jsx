import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import CartDrawer from "./components/Cart/CartDrawer";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import DeliveryProtectedRoute from "./components/Delivery/DeliveryProtectedRoute";
import RouteWrapper from "./components/RouteWrapper";
import ScrollToTop from "./components/ScrollToTop";
import RouteSkeleton from "./components/Skeletons/RouteSkeleton";

// Lazy load all route components for code splitting
// Public routes
const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Search = lazy(() => import("./pages/Search"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Verification = lazy(() => import("./pages/Verification"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const Addresses = lazy(() => import("./pages/Addresses"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Offers = lazy(() => import("./pages/Offers"));
const DailyDeals = lazy(() => import("./pages/DailyDeals"));
const FlashSale = lazy(() => import("./pages/FlashSale"));
const CampaignPage = lazy(() => import("./pages/CampaignPage"));
const Category = lazy(() => import("./pages/Category"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const OrderDetailPage = lazy(() => import("./pages/OrderDetail"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));

// Admin routes
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminLayout = lazy(() => import("./components/Admin/Layout/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const ProductForm = lazy(() => import("./pages/admin/ProductForm"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const OrderDetail = lazy(() => import("./pages/admin/OrderDetail"));
const ReturnRequests = lazy(() => import("./pages/admin/ReturnRequests"));
const ReturnRequestDetail = lazy(() =>
  import("./pages/admin/ReturnRequestDetail")
);
const Categories = lazy(() => import("./pages/admin/Categories"));
const Brands = lazy(() => import("./pages/admin/Brands"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Inventory = lazy(() => import("./pages/admin/Inventory"));
const Campaigns = lazy(() => import("./pages/admin/Campaigns"));
const Banners = lazy(() => import("./pages/admin/Banners"));
const Reviews = lazy(() => import("./pages/admin/Reviews"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const Content = lazy(() => import("./pages/admin/Content"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const More = lazy(() => import("./pages/admin/More"));
const PromoCodes = lazy(() => import("./pages/admin/PromoCodes"));

// Admin child routes - Orders
const AllOrders = lazy(() => import("./pages/admin/orders/AllOrders"));
const OrderTracking = lazy(() => import("./pages/admin/orders/OrderTracking"));
const OrderNotifications = lazy(() =>
  import("./pages/admin/orders/OrderNotifications")
);
const Invoice = lazy(() => import("./pages/admin/orders/Invoice"));

// Admin child routes - Products
const ManageProducts = lazy(() =>
  import("./pages/admin/products/ManageProducts")
);
const AddProduct = lazy(() => import("./pages/admin/products/AddProduct"));
const BulkUpload = lazy(() => import("./pages/admin/products/BulkUpload"));
const TaxPricing = lazy(() => import("./pages/admin/products/TaxPricing"));
const ProductRatings = lazy(() =>
  import("./pages/admin/products/ProductRatings")
);
const ProductFAQs = lazy(() => import("./pages/admin/products/ProductFAQs"));

// Admin child routes - Attributes
const AttributeSets = lazy(() =>
  import("./pages/admin/attributes/AttributeSets")
);
const Attributes = lazy(() => import("./pages/admin/attributes/Attributes"));
const AttributeValues = lazy(() =>
  import("./pages/admin/attributes/AttributeValues")
);

// Admin child routes - Categories
const ManageCategories = lazy(() =>
  import("./pages/admin/categories/ManageCategories")
);
const CategoryOrder = lazy(() =>
  import("./pages/admin/categories/CategoryOrder")
);

// Admin child routes - Brands
const ManageBrands = lazy(() => import("./pages/admin/brands/ManageBrands"));

// Admin child routes - Customers
const ViewCustomers = lazy(() =>
  import("./pages/admin/customers/ViewCustomers")
);
const CustomerAddresses = lazy(() =>
  import("./pages/admin/customers/Addresses")
);
const Transactions = lazy(() => import("./pages/admin/customers/Transactions"));
const CustomerDetailPage = lazy(() =>
  import("./pages/admin/customers/CustomerDetailPage")
);

// Admin child routes - Delivery
const DeliveryBoys = lazy(() => import("./pages/admin/delivery/DeliveryBoys"));
const CashCollection = lazy(() =>
  import("./pages/admin/delivery/CashCollection")
);

// Admin child routes - Locations
const Cities = lazy(() => import("./pages/admin/locations/Cities"));
const Zipcodes = lazy(() => import("./pages/admin/locations/Zipcodes"));

// Admin child routes - Offers
const HomeSliders = lazy(() => import("./pages/admin/offers/HomeSliders"));
const FestivalOffers = lazy(() =>
  import("./pages/admin/offers/FestivalOffers")
);

// Admin child routes - Notifications
const PushNotifications = lazy(() =>
  import("./pages/admin/notifications/PushNotifications")
);
const CustomMessages = lazy(() =>
  import("./pages/admin/notifications/CustomMessages")
);

// Admin child routes - Support
const LiveChat = lazy(() => import("./pages/admin/support/LiveChat"));
const TicketTypes = lazy(() => import("./pages/admin/support/TicketTypes"));
const Tickets = lazy(() => import("./pages/admin/support/Tickets"));

// Admin child routes - Reports
const SalesReport = lazy(() => import("./pages/admin/reports/SalesReport"));
const InventoryReport = lazy(() =>
  import("./pages/admin/reports/InventoryReport")
);

// Admin child routes - Finance
const RevenueOverview = lazy(() =>
  import("./pages/admin/finance/RevenueOverview")
);
const ProfitLoss = lazy(() => import("./pages/admin/finance/ProfitLoss"));
const OrderTrends = lazy(() => import("./pages/admin/finance/OrderTrends"));
const PaymentBreakdown = lazy(() =>
  import("./pages/admin/finance/PaymentBreakdown")
);
const TaxReports = lazy(() => import("./pages/admin/finance/TaxReports"));
const RefundReports = lazy(() => import("./pages/admin/finance/RefundReports"));

// Admin child routes - Settings
const GeneralSettings = lazy(() =>
  import("./pages/admin/settings/GeneralSettings")
);
const PaymentShippingSettings = lazy(() =>
  import("./pages/admin/settings/PaymentShippingSettings")
);
const OrdersCustomersSettings = lazy(() =>
  import("./pages/admin/settings/OrdersCustomersSettings")
);
const ProductsInventorySettings = lazy(() =>
  import("./pages/admin/settings/ProductsInventorySettings")
);
const ContentFeaturesSettings = lazy(() =>
  import("./pages/admin/settings/ContentFeaturesSettings")
);
const NotificationsSEOSettings = lazy(() =>
  import("./pages/admin/settings/NotificationsSEOSettings")
);

// Admin child routes - Policies
const PrivacyPolicy = lazy(() =>
  import("./pages/admin/policies/PrivacyPolicy")
);
const RefundPolicy = lazy(() => import("./pages/admin/policies/RefundPolicy"));
const TermsConditions = lazy(() =>
  import("./pages/admin/policies/TermsConditions")
);

// Admin child routes - Firebase
const PushConfig = lazy(() => import("./pages/admin/firebase/PushConfig"));
const Authentication = lazy(() =>
  import("./pages/admin/firebase/Authentication")
);

// Mobile App Routes
const MobileHome = lazy(() => import("./pages/App/Home"));
const MobileProductDetail = lazy(() => import("./pages/App/ProductDetail"));
const MobileCategory = lazy(() => import("./pages/App/Category"));
const MobileCategories = lazy(() => import("./pages/App/categories"));
const MobileCheckout = lazy(() => import("./pages/App/Checkout"));
const MobileSearch = lazy(() => import("./pages/App/Search"));
const MobileLogin = lazy(() => import("./pages/App/Login"));
const MobileRegister = lazy(() => import("./pages/App/Register"));
const MobileVerification = lazy(() => import("./pages/App/Verification"));
const MobileProfile = lazy(() => import("./pages/App/Profile"));
const MobileOrders = lazy(() => import("./pages/App/Orders"));
const MobileOrderDetail = lazy(() => import("./pages/App/OrderDetail"));
const MobileAddresses = lazy(() => import("./pages/App/Addresses"));
const MobileWishlist = lazy(() => import("./pages/App/Wishlist"));
const MobileOffers = lazy(() => import("./pages/App/Offers"));
const MobileDailyDeals = lazy(() => import("./pages/App/DailyDeals"));
const MobileFlashSale = lazy(() => import("./pages/App/FlashSale"));
const MobileTrackOrder = lazy(() => import("./pages/App/TrackOrder"));
const MobileOrderConfirmation = lazy(() =>
  import("./pages/App/OrderConfirmation")
);

// Delivery Routes
const DeliveryLogin = lazy(() => import("./pages/delivery/Login"));
const DeliveryLayout = lazy(() =>
  import("./components/Delivery/Layout/DeliveryLayout")
);
const DeliveryDashboard = lazy(() => import("./pages/delivery/Dashboard"));
const DeliveryOrders = lazy(() => import("./pages/delivery/Orders"));
const DeliveryOrderDetail = lazy(() => import("./pages/delivery/OrderDetail"));
const DeliveryProfile = lazy(() => import("./pages/delivery/Profile"));

// Wrapper component for lazy-loaded routes with Suspense
const LazyRoute = ({ children }) => (
  <Suspense fallback={<RouteSkeleton />}>{children}</Suspense>
);

// Inner component that has access to useLocation
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LazyRoute>
            <RouteWrapper>
              <Home />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <LazyRoute>
            <RouteWrapper>
              <ProductDetail />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/category/:id"
        element={
          <LazyRoute>
            <RouteWrapper>
              <Category />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <LazyRoute>
            <RouteWrapper>
              <Checkout />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/search"
        element={
          <LazyRoute>
            <RouteWrapper>
              <Search />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/login"
        element={
          <LazyRoute>
            <RouteWrapper>
              <Login />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <LazyRoute>
            <RouteWrapper>
              <Register />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/verification"
        element={
          <LazyRoute>
            <RouteWrapper>
              <Verification />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <LazyRoute>
            <RouteWrapper>
              <Wishlist />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/offers"
        element={
          <LazyRoute>
            <RouteWrapper>
              <Offers />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/daily-deals"
        element={
          <LazyRoute>
            <RouteWrapper>
              <DailyDeals />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/flash-sale"
        element={
          <LazyRoute>
            <RouteWrapper>
              <FlashSale />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/sale/:slug"
        element={
          <LazyRoute>
            <RouteWrapper>
              <CampaignPage />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/campaign/:id"
        element={
          <LazyRoute>
            <RouteWrapper>
              <CampaignPage />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/order-confirmation/:orderId"
        element={
          <LazyRoute>
            <RouteWrapper>
              <OrderConfirmation />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/orders/:orderId"
        element={
          <LazyRoute>
            <RouteWrapper>
              <OrderDetailPage />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/track-order/:orderId"
        element={
          <LazyRoute>
            <RouteWrapper>
              <TrackOrder />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <LazyRoute>
            <RouteWrapper>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <LazyRoute>
            <RouteWrapper>
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/addresses"
        element={
          <LazyRoute>
            <RouteWrapper>
              <ProtectedRoute>
                <Addresses />
              </ProtectedRoute>
            </RouteWrapper>
          </LazyRoute>
        }
      />
      {/* Admin Routes */}
      <Route
        path="/admin/login"
        element={
          <LazyRoute>
            <AdminLogin />
          </LazyRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <LazyRoute>
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          </LazyRoute>
        }>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <LazyRoute>
              <Dashboard />
            </LazyRoute>
          }
        />
        <Route
          path="products"
          element={
            <LazyRoute>
              <Products />
            </LazyRoute>
          }
        />
        <Route
          path="products/:id"
          element={
            <LazyRoute>
              <ProductForm />
            </LazyRoute>
          }
        />
        <Route
          path="products/manage-products"
          element={
            <LazyRoute>
              <ManageProducts />
            </LazyRoute>
          }
        />
        <Route
          path="products/add-product"
          element={
            <LazyRoute>
              <AddProduct />
            </LazyRoute>
          }
        />
        <Route
          path="products/bulk-upload"
          element={
            <LazyRoute>
              <BulkUpload />
            </LazyRoute>
          }
        />
        <Route
          path="products/tax-pricing"
          element={
            <LazyRoute>
              <TaxPricing />
            </LazyRoute>
          }
        />
        <Route
          path="products/product-ratings"
          element={
            <LazyRoute>
              <ProductRatings />
            </LazyRoute>
          }
        />
        <Route
          path="products/product-faqs"
          element={
            <LazyRoute>
              <ProductFAQs />
            </LazyRoute>
          }
        />
        <Route
          path="more"
          element={
            <LazyRoute>
              <More />
            </LazyRoute>
          }
        />
        <Route
          path="categories"
          element={
            <LazyRoute>
              <Categories />
            </LazyRoute>
          }
        />
        <Route
          path="categories/manage-categories"
          element={
            <LazyRoute>
              <ManageCategories />
            </LazyRoute>
          }
        />
        <Route
          path="categories/category-order"
          element={
            <LazyRoute>
              <CategoryOrder />
            </LazyRoute>
          }
        />
        <Route
          path="brands"
          element={
            <LazyRoute>
              <Brands />
            </LazyRoute>
          }
        />
        <Route
          path="brands/manage-brands"
          element={
            <LazyRoute>
              <ManageBrands />
            </LazyRoute>
          }
        />
        <Route
          path="orders"
          element={
            <LazyRoute>
              <AdminOrders />
            </LazyRoute>
          }
        />
        <Route
          path="orders/:id"
          element={
            <LazyRoute>
              <OrderDetail />
            </LazyRoute>
          }
        />
        <Route
          path="orders/:id/invoice"
          element={
            <LazyRoute>
              <Invoice />
            </LazyRoute>
          }
        />
        <Route
          path="orders/all-orders"
          element={
            <LazyRoute>
              <AllOrders />
            </LazyRoute>
          }
        />
        <Route
          path="orders/order-tracking"
          element={
            <LazyRoute>
              <OrderTracking />
            </LazyRoute>
          }
        />
        <Route
          path="orders/order-notifications"
          element={
            <LazyRoute>
              <OrderNotifications />
            </LazyRoute>
          }
        />
        <Route
          path="return-requests"
          element={
            <LazyRoute>
              <ReturnRequests />
            </LazyRoute>
          }
        />
        <Route
          path="return-requests/:id"
          element={
            <LazyRoute>
              <ReturnRequestDetail />
            </LazyRoute>
          }
        />
        <Route
          path="customers"
          element={
            <LazyRoute>
              <Customers />
            </LazyRoute>
          }
        />
        <Route
          path="customers/view-customers"
          element={
            <LazyRoute>
              <ViewCustomers />
            </LazyRoute>
          }
        />
        <Route
          path="customers/addresses"
          element={
            <LazyRoute>
              <CustomerAddresses />
            </LazyRoute>
          }
        />
        <Route
          path="customers/transactions"
          element={
            <LazyRoute>
              <Transactions />
            </LazyRoute>
          }
        />
        <Route
          path="customers/:id"
          element={
            <LazyRoute>
              <CustomerDetailPage />
            </LazyRoute>
          }
        />
        <Route
          path="attributes"
          element={
            <LazyRoute>
              <AttributeSets />
            </LazyRoute>
          }
        />
        <Route
          path="attributes/attribute-sets"
          element={
            <LazyRoute>
              <AttributeSets />
            </LazyRoute>
          }
        />
        <Route
          path="attributes/attributes"
          element={
            <LazyRoute>
              <Attributes />
            </LazyRoute>
          }
        />
        <Route
          path="attributes/attribute-values"
          element={
            <LazyRoute>
              <AttributeValues />
            </LazyRoute>
          }
        />
        <Route
          path="stock"
          element={
            <LazyRoute>
              <Inventory />
            </LazyRoute>
          }
        />
        <Route
          path="inventory"
          element={
            <LazyRoute>
              <Inventory />
            </LazyRoute>
          }
        />
        <Route
          path="delivery"
          element={
            <LazyRoute>
              <DeliveryBoys />
            </LazyRoute>
          }
        />
        <Route
          path="delivery/delivery-boys"
          element={
            <LazyRoute>
              <DeliveryBoys />
            </LazyRoute>
          }
        />
        <Route
          path="delivery/cash-collection"
          element={
            <LazyRoute>
              <CashCollection />
            </LazyRoute>
          }
        />
        <Route
          path="locations"
          element={
            <LazyRoute>
              <Cities />
            </LazyRoute>
          }
        />
        <Route
          path="locations/cities"
          element={
            <LazyRoute>
              <Cities />
            </LazyRoute>
          }
        />
        <Route
          path="locations/zipcodes"
          element={
            <LazyRoute>
              <Zipcodes />
            </LazyRoute>
          }
        />
        <Route
          path="offers"
          element={
            <LazyRoute>
              <HomeSliders />
            </LazyRoute>
          }
        />
        <Route
          path="offers/home-sliders"
          element={
            <LazyRoute>
              <HomeSliders />
            </LazyRoute>
          }
        />
        <Route
          path="offers/festival-offers"
          element={
            <LazyRoute>
              <FestivalOffers />
            </LazyRoute>
          }
        />
        <Route
          path="promocodes"
          element={
            <LazyRoute>
              <PromoCodes />
            </LazyRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <LazyRoute>
              <PushNotifications />
            </LazyRoute>
          }
        />
        <Route
          path="notifications/push-notifications"
          element={
            <LazyRoute>
              <PushNotifications />
            </LazyRoute>
          }
        />
        <Route
          path="notifications/custom-messages"
          element={
            <LazyRoute>
              <CustomMessages />
            </LazyRoute>
          }
        />
        <Route
          path="support"
          element={
            <LazyRoute>
              <Tickets />
            </LazyRoute>
          }
        />
        <Route
          path="support/live-chat"
          element={
            <LazyRoute>
              <LiveChat />
            </LazyRoute>
          }
        />
        <Route
          path="support/ticket-types"
          element={
            <LazyRoute>
              <TicketTypes />
            </LazyRoute>
          }
        />
        <Route
          path="support/tickets"
          element={
            <LazyRoute>
              <Tickets />
            </LazyRoute>
          }
        />
        <Route
          path="reports"
          element={
            <LazyRoute>
              <SalesReport />
            </LazyRoute>
          }
        />
        <Route
          path="reports/sales-report"
          element={
            <LazyRoute>
              <SalesReport />
            </LazyRoute>
          }
        />
        <Route
          path="reports/inventory-report"
          element={
            <LazyRoute>
              <InventoryReport />
            </LazyRoute>
          }
        />
        <Route
          path="finance"
          element={
            <LazyRoute>
              <RevenueOverview />
            </LazyRoute>
          }
        />
        <Route
          path="finance/revenue-overview"
          element={
            <LazyRoute>
              <RevenueOverview />
            </LazyRoute>
          }
        />
        <Route
          path="finance/profit-loss"
          element={
            <LazyRoute>
              <ProfitLoss />
            </LazyRoute>
          }
        />
        <Route
          path="finance/order-trends"
          element={
            <LazyRoute>
              <OrderTrends />
            </LazyRoute>
          }
        />
        <Route
          path="finance/payment-breakdown"
          element={
            <LazyRoute>
              <PaymentBreakdown />
            </LazyRoute>
          }
        />
        <Route
          path="finance/tax-reports"
          element={
            <LazyRoute>
              <TaxReports />
            </LazyRoute>
          }
        />
        <Route
          path="finance/refund-reports"
          element={
            <LazyRoute>
              <RefundReports />
            </LazyRoute>
          }
        />
        <Route
          path="analytics"
          element={
            <LazyRoute>
              <Analytics />
            </LazyRoute>
          }
        />
        <Route
          path="settings"
          element={<Navigate to="/admin/settings/general" replace />}
        />
        <Route
          path="settings/general"
          element={
            <LazyRoute>
              <Settings />
            </LazyRoute>
          }
        />
        <Route
          path="settings/payment-shipping"
          element={
            <LazyRoute>
              <Settings />
            </LazyRoute>
          }
        />
        <Route
          path="settings/orders-customers"
          element={
            <LazyRoute>
              <Settings />
            </LazyRoute>
          }
        />
        <Route
          path="settings/products-inventory"
          element={
            <LazyRoute>
              <Settings />
            </LazyRoute>
          }
        />
        <Route
          path="settings/content-features"
          element={
            <LazyRoute>
              <Settings />
            </LazyRoute>
          }
        />
        <Route
          path="settings/notifications-seo"
          element={
            <LazyRoute>
              <Settings />
            </LazyRoute>
          }
        />
        <Route
          path="policies"
          element={
            <LazyRoute>
              <PrivacyPolicy />
            </LazyRoute>
          }
        />
        <Route
          path="policies/privacy-policy"
          element={
            <LazyRoute>
              <PrivacyPolicy />
            </LazyRoute>
          }
        />
        <Route
          path="policies/refund-policy"
          element={
            <LazyRoute>
              <RefundPolicy />
            </LazyRoute>
          }
        />
        <Route
          path="policies/terms-conditions"
          element={
            <LazyRoute>
              <TermsConditions />
            </LazyRoute>
          }
        />
        <Route
          path="firebase"
          element={
            <LazyRoute>
              <PushConfig />
            </LazyRoute>
          }
        />
        <Route
          path="firebase/push-config"
          element={
            <LazyRoute>
              <PushConfig />
            </LazyRoute>
          }
        />
        <Route
          path="firebase/authentication"
          element={
            <LazyRoute>
              <Authentication />
            </LazyRoute>
          }
        />
        <Route
          path="campaigns"
          element={
            <LazyRoute>
              <Campaigns />
            </LazyRoute>
          }
        />
        <Route
          path="banners"
          element={
            <LazyRoute>
              <Banners />
            </LazyRoute>
          }
        />
        <Route
          path="reviews"
          element={
            <LazyRoute>
              <Reviews />
            </LazyRoute>
          }
        />
        <Route
          path="content"
          element={
            <LazyRoute>
              <Content />
            </LazyRoute>
          }
        />
      </Route>
      {/* Delivery Routes */}
      <Route
        path="/delivery/login"
        element={
          <LazyRoute>
            <DeliveryLogin />
          </LazyRoute>
        }
      />
      <Route
        path="/delivery"
        element={
          <LazyRoute>
            <DeliveryProtectedRoute>
              <DeliveryLayout />
            </DeliveryProtectedRoute>
          </LazyRoute>
        }>
        <Route index element={<Navigate to="/delivery/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <LazyRoute>
              <DeliveryDashboard />
            </LazyRoute>
          }
        />
        <Route
          path="orders"
          element={
            <LazyRoute>
              <DeliveryOrders />
            </LazyRoute>
          }
        />
        <Route
          path="orders/:id"
          element={
            <LazyRoute>
              <DeliveryOrderDetail />
            </LazyRoute>
          }
        />
        <Route
          path="profile"
          element={
            <LazyRoute>
              <DeliveryProfile />
            </LazyRoute>
          }
        />
      </Route>
      {/* Mobile App Routes */}
      <Route
        path="/app"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileHome />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/product/:id"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileProductDetail />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/category/:id"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileCategory />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/categories"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileCategories />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/checkout"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileCheckout />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/search"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileSearch />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/login"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileLogin />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/register"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileRegister />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/verification"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileVerification />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/wishlist"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileWishlist />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/offers"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileOffers />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/daily-deals"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileDailyDeals />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/flash-sale"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileFlashSale />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/order-confirmation/:orderId"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileOrderConfirmation />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/orders/:orderId"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileOrderDetail />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/track-order/:orderId"
        element={
          <LazyRoute>
            <RouteWrapper>
              <MobileTrackOrder />
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/profile"
        element={
          <LazyRoute>
            <RouteWrapper>
              <ProtectedRoute>
                <MobileProfile />
              </ProtectedRoute>
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/orders"
        element={
          <LazyRoute>
            <RouteWrapper>
              <ProtectedRoute>
                <MobileOrders />
              </ProtectedRoute>
            </RouteWrapper>
          </LazyRoute>
        }
      />
      <Route
        path="/app/addresses"
        element={
          <LazyRoute>
            <RouteWrapper>
              <ProtectedRoute>
                <MobileAddresses />
              </ProtectedRoute>
            </RouteWrapper>
          </LazyRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}>
        <ScrollToTop />
        <AppRoutes />
        <CartDrawer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#212121",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#388E3C",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#FF6161",
                secondary: "#fff",
              },
            },
          }}
        />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
