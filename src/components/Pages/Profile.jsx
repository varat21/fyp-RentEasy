

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditModal from "./ProfileEditModal";
import axios from "axios";
import { Tabs, Divider, Modal } from "@mantine/core";
import { Button } from "@mantine/core";
import { CiUser } from "react-icons/ci";
import moment from "moment";
import useBookingStore from "../stores/useBookingStore";
import { Card, Group, Title, Badge, Rating, Text } from "@mantine/core";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import EditPropertiesModal from "./EditPropertiesModal";
import {
  FaMoneyBillAlt,
  FaRuler,
  FaMapMarkerAlt,
  FaRoad,
  FaCompass,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader, Trash } from "lucide-react";
import DeletePropertiesModal from "./deleteProfilePropertiesModal";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const GetProfileData = () => {
  // State and hooks
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Zustand store
  const { bookedProperty, totalAmount, removeProperty, clearBookings } = useBookingStore();

  const navigate = useNavigate();

  // Generate success URL with actual values
  const generateSuccessUrl = () => {
    const token = localStorage.getItem("token");
    if (!token) return "";

    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.userId;

    if (!bookedProperty || totalAmount <= 0) {
      console.error("No booked property or invalid total amount");
      return "";
    }

    const bookingId = bookedProperty?.bookingId || `bk_${Date.now()}`;
    const propertyId = bookedProperty?.propertyId || bookedProperty?.id;
    const transaction_uuid = uuidv4();

    const amount = totalAmount > 0 ? totalAmount : bookedProperty?.price || 0;

    return `http://localhost:5173/paymentSuccess?booking_id=${bookingId}&amount=${amount}&propertyId=${propertyId}&transaction_uuid=${transaction_uuid}&user_id=${userId}`;
  };

  // eSewa form data
  const [esewaFormData, setEsewaFormData] = useState({
    amount: "0",
    tax_amount: "0",
    total_amount: "0",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "",
    failure_url: "https://localhost:5173/payment-failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  // Khalti form data
  const [khaltiFormData, setKhaltiFormData] = useState({
    public_key: "test_public_key_xxx", // Replace with your Khalti public key
    amount: "0", // Amount in paisa (e.g., 1000 for Rs. 10)
    purchase_order_id: uuidv4(),
    purchase_order_name: "Property Booking",
    return_url: "",
    website_url: "http://localhost:5173",
  });

  // Update eSewa formData when totalAmount or bookedProperty change
  useEffect(() => {
    if (!bookedProperty || totalAmount <= 0) {
      console.warn("No booked property or invalid total amount");
      return;
    }

    const amount = totalAmount > 0 ? totalAmount.toString() : bookedProperty?.price?.toString() || "0";
    const taxAmount = "0";
    const serviceCharge = "0";
    const deliveryCharge = "0";
    const totalAmountCalculated = (
      Number(amount) +
      Number(taxAmount) +
      Number(serviceCharge) +
      Number(deliveryCharge)
    ).toString();

    const successUrl = generateSuccessUrl();

    setEsewaFormData((prev) => ({
      ...prev,
      amount: amount,
      tax_amount: taxAmount,
      product_service_charge: serviceCharge,
      product_delivery_charge: deliveryCharge,
      total_amount: totalAmountCalculated,
      transaction_uuid: uuidv4(),
      success_url: successUrl,
    }));
  }, [totalAmount, bookedProperty]);

  // Update Khalti formData when totalAmount or bookedProperty change
  useEffect(() => {
    if (!bookedProperty || totalAmount <= 0) {
      console.warn("No booked property or invalid total amount");
      return;
    }

    const amountInPaisa = totalAmount > 0 ? totalAmount * 100 : bookedProperty?.price * 100 || 0; // Convert to paisa
    const successUrl = generateSuccessUrl();

    setKhaltiFormData((prev) => ({
      ...prev,
      amount: amountInPaisa.toString(),
      purchase_order_id: uuidv4(),
      return_url: successUrl,
    }));
  }, [totalAmount, bookedProperty]);

  // Generate eSewa signature
  const generateEsewaSignature = (total_amount, transaction_uuid, product_code, secret) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const signature = CryptoJS.enc.Base64.stringify(hash);
    return signature;
  };

  // Calculate eSewa signature when formData changes
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = esewaFormData;
    if (total_amount && transaction_uuid && product_code) {
      const hashedSignature = generateEsewaSignature(total_amount, transaction_uuid, product_code, secret);
      setEsewaFormData((prev) => ({ ...prev, signature: hashedSignature }));
    }
  }, [esewaFormData.total_amount, esewaFormData.transaction_uuid]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const extractedUserId = decodedToken?.userId;
        setUserId(extractedUserId);

        const response = await axios.get(
          `http://localhost/rent-easy/public/profile.php/id=${extractedUserId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setProfileData(response.data.user);
          setProperties(response.data.properties || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleRemoveProperty = () => {
    removeProperty();
    toast.success("Property removed from bookings");
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentSubmit = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (selectedPaymentMethod === "esewa") {
      if (Number(esewaFormData.total_amount) <= 0) {
        toast.error("Total amount must be greater than 0");
        return;
      }
      setPaymentProcessing(true);
      document.getElementById("esewa-form").submit();
    } else if (selectedPaymentMethod === "khalti") {
      if (Number(khaltiFormData.amount) <= 0) {
        toast.error("Total amount must be greater than 0");
        return;
      }
      setPaymentProcessing(true);
      navigate("/khaltiPayment", {
        state: {
          khaltiData: khaltiFormData,
          bookedProperty,
          totalAmount,
          successUrl: generateSuccessUrl()
        }
      });
      setPaymentProcessing(false);
      setPaymentModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="text-blue-700 w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg font-semibold text-red-500">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 mt-20 min-h-[50vh]">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">My Dashboard</h1>

      <Tabs color="teal" defaultValue="first" className="mx-auto bg-white shadow-md rounded-xl">
        <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
          <Tabs.Tab value="first" className="text-lg font-semibold">
            Booked Property
          </Tabs.Tab>
          <Tabs.Tab value="second" className="text-lg font-semibold">
            My Profile
          </Tabs.Tab>
          <Tabs.Tab value="third" className="text-lg font-semibold">
            My Properties
          </Tabs.Tab>
        </Tabs.List>

        {/* Booked Property Tab */}
        <Tabs.Panel value="first" pt="xs">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-left">My Booked Property</h3>

            {bookedProperty ? (
              <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/4">
                    <img
                      src={bookedProperty.images?.[0] || "/default-property.jpg"}
                      alt={bookedProperty.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <Group>
                        <Title order={3}>{bookedProperty.title}</Title>
                        <Badge variant="filled" size="lg">
                          Booking #1
                        </Badge>
                      </Group>
                      <Button
                        onClick={handleRemoveProperty}
                        variant="subtle"
                        color="red"
                      >
                        <Trash size={20} />
                      </Button>
                    </div>

                    <Text color="dimmed" className="mt-2">
                      {bookedProperty.description}
                    </Text>

                    {bookedProperty.ratings?.length > 0 && (
                      <div className="mt-4 flex items-center gap-2">
                        <Rating
                          value={calculateAverageRating(bookedProperty.ratings)}
                          readOnly
                          size="sm"
                        />
                        <Text size="sm" color="dimmed">
                          {calculateAverageRating(bookedProperty.ratings)} ({bookedProperty.ratings.length} reviews)
                        </Text>
                      </div>
                    )}

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Text size="sm" color="dimmed">
                          Price
                        </Text>
                        <Text weight={600}>Rs. {bookedProperty.price}</Text>
                      </div>
                      <div>
                        <Text size="sm" color="dimmed">
                          Location
                        </Text>
                        <Text weight={600}>
                          {bookedProperty.city}, {bookedProperty.country}
                        </Text>
                      </div>
                      <div>
                        <Text size="sm" color="dimmed">
                          Size
                        </Text>
                        <Text weight={600}>{bookedProperty.dimension} sqft</Text>
                      </div>
                      <div>
                        <Text size="sm" color="dimmed">
                          Booked On
                        </Text>
                        <Text weight={600}>
                          {moment(bookedProperty.bookingDate).format("MMM DD, YYYY")}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Text color="dimmed">No property booked yet.</Text>
            )}

            <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-8">
              <Group position="apart" className="mb-6">
                <Title order={3}>Booking Summary</Title>
              </Group>

              <Group position="right" spacing="md">
                <Button
                  onClick={() => setPaymentModalOpen(true)}
                  variant="filled"
                  disabled={!bookedProperty || totalAmount <= 0}
                >
                  Complete Payment
                </Button>
              </Group>
            </Card>
          </motion.div>
        </Tabs.Panel>

        {/* My Profile Tab */}
        <Tabs.Panel value="second" pt="xs">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
            <div className="text-center mb-6">
              {profileData.image ? (
                <img
                  src={profileData.image}
                  alt="User Profile"
                  className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
                />
              ) : (
                <div className="w-24 h-24 mx-auto rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                  <img
                    src={`https://ui-avatars.com/api/?name=${profileData.name}&background=random&size=100`}
                    alt="Owner"
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4 text-center">
              <div>
                <p className="text-sm font-medium text-gray-600">Name</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">
                  {profileData.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-800">
                  {profileData.email || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-lg font-semibold text-gray-800">
                  {profileData.phoneNumber || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Address</p>
                <p className="text-lg font-semibold text-gray-800">
                  {profileData.address || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">User Type</p>
                <p className="text-lg font-semibold text-gray-800">
                  {profileData.userType}
                </p>
              </div>
              <div>
                <Badge color="green" size="lg">
                  Active
                </Badge>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="filled" color="blue" onClick={open}>
                Edit Profile
              </Button>
            </div>
          </div>
        </Tabs.Panel>

        {/* My Properties Tab */}
        <Tabs.Panel value="third" pt="xs">
          <div className="p-6 bg-gray-50">
            <h3 className="text-xl font-semibold mb-4 text-left">Added Properties</h3>
            {properties.length > 0 ? (
              properties.map((property) => (
                <Card
                  key={property.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  className="mb-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/4">
                      <img
                        src={
                          property.images.length > 0
                            ? property.images[0]
                            : "https://via.placeholder.com/400x300?text=No+Image"
                        }
                        alt={property.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <Title order={3}>{property.title}</Title>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            leftIcon={<MdEdit size={16} />}
                            onClick={() => {
                              setSelectedPropertyId(property.propertyId);
                              openEditModal();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            color="red"
                            leftIcon={<AiTwotoneDelete size={16} />}
                            onClick={() => {
                              setSelectedPropertyId(property.propertyId);
                              openDeleteModal();
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <Text color="dimmed" className="mt-2">
                        {property.description}
                      </Text>
                      <div className="flex justify-center">
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-6 w-full">
                          {[
                            {
                              label: "Price",
                              value: `Rs. ${property.price}`,
                              icon: <FaMoneyBillAlt className="text-2xl text-blue-500" />,
                            },
                            {
                              label: "Size",
                              value: `${property.dimension} sqft`,
                              icon: <FaRuler className="text-2xl text-green-500" />,
                            },
                            {
                              label: "Location",
                              value: `${property.city}, ${property.country}`,
                              icon: <FaMapMarkerAlt className="text-2xl text-red-500" />,
                            },
                            {
                              label: "Road Type",
                              value: property.road_type,
                              icon: <FaRoad className="text-2xl text-purple-500" />,
                            },
                            {
                              label: "Facing",
                              value: property.property_face,
                              icon: <FaCompass className="text-2xl text-yellow-500" />,
                            },
                            {
                              label: "Posted on",
                              value: moment(property.uploaded_at).format("MMM Do YYYY"),
                              icon: <FaCalendarAlt className="text-2xl text-pink-500" />,
                            },
                          ].map((detail, index) => (
                            <div
                              key={index}
                              className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center"
                            >
                              <div className="mb-2">{detail.icon}</div>
                              <p className="text-lg font-semibold text-gray-800">
                                {detail.label}
                              </p>
                              <p className="text-gray-700 text-md mt-1">
                                {detail.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Text color="dimmed">No properties added yet.</Text>
            )}
          </div>
        </Tabs.Panel>
      </Tabs>

      {/* Modals */}
      <ProfileEditModal
        opened={opened}
        close={close}
        name={profileData.name}
        address={profileData.address}
        phoneNumber={profileData.phoneNumber}
        gender={profileData.gender}
        password={profileData.password}
        id={profileData.id}
        email={profileData.email}
      />

      <EditPropertiesModal
        userId={userId}
        opened={editModalOpened}
        onClose={closeEditModal}
        propertyId={selectedPropertyId}
        property={properties.find((p) => p.propertyId === selectedPropertyId)}
      />

      <DeletePropertiesModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        propertyId={selectedPropertyId}
      />

      <Modal
        opened={paymentModalOpen}
        onClose={() => !paymentProcessing && setPaymentModalOpen(false)}
        title="Complete Payment"
        centered
        size="lg"
      >
        <div className="p-4 flex flex-col md:flex-row gap-6">
          {/* Payment Methods */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* eSewa Mobile Wallet */}
              <div
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                  selectedPaymentMethod === "esewa"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handlePaymentMethodSelect("esewa")}
              >
                <img
                  src="/esewa.png"
                  alt="eSewa Mobile Wallet"
                  className="w-20 h-15 mb-2"
                />
                <p className="text-sm text-center">eSewa Mobile Wallet</p>
              </div>

              {/* Khalti Pay */}
              <div
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                  selectedPaymentMethod === "khalti"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handlePaymentMethodSelect("khalti")}
              >
                <img
                  src="/khalti.png"
                  alt="Khalti Pay"
                  className="w-28 h-14 mb-2"
                />
                <p className="text-sm text-center">Pay with Khalti</p>
              </div>
            </div>

            {/* Hidden eSewa Form */}
            {selectedPaymentMethod === "esewa" && (
              <form
                id="esewa-form"
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
                className="hidden"
              >
                <input type="hidden" name="amount" value={esewaFormData.amount} />
                <input type="hidden" name="tax_amount" value={esewaFormData.tax_amount} />
                <input type="hidden" name="total_amount" value={esewaFormData.total_amount} />
                <input type="hidden" name="transaction_uuid" value={esewaFormData.transaction_uuid} />
                <input type="hidden" name="product_code" value={esewaFormData.product_code} />
                <input type="hidden" name="product_service_charge" value={esewaFormData.product_service_charge} />
                <input type="hidden" name="product_delivery_charge" value={esewaFormData.product_delivery_charge} />
                <input type="hidden" name="success_url" value={esewaFormData.success_url} />
                <input type="hidden" name="failure_url" value={esewaFormData.failure_url} />
                <input type="hidden" name="signed_field_names" value={esewaFormData.signed_field_names} />
                <input type="hidden" name="signature" value={esewaFormData.signature} />
              </form>
            )}

            {/* Hidden Khalti Form */}
            {selectedPaymentMethod === "khalti" && (
              <form
                id="khalti-form"
                action="https://a.khalti.com/api/v2/epayment/initiate/"
                method="POST"
                className="hidden"
              >
                <input type="hidden" name="public_key" value={khaltiFormData.public_key} />
                <input type="hidden" name="amount" value={khaltiFormData.amount} />
                <input type="hidden" name="purchase_order_id" value={khaltiFormData.purchase_order_id} />
                <input type="hidden" name="purchase_order_name" value={khaltiFormData.purchase_order_name} />
                <input type="hidden" name="return_url" value={khaltiFormData.return_url} />
                <input type="hidden" name="website_url" value={khaltiFormData.website_url} />
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold">Rs. {Number(totalAmount).toLocaleString('en-IN')}</p>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Total Amount</p>
                <p className="text-lg font-semibold text-orange-500">Rs. {Number(totalAmount).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handlePaymentSubmit}
            loading={paymentProcessing}
            disabled={!selectedPaymentMethod}
          >
            {paymentProcessing ? "Processing..." : "Proceed to Pay"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default GetProfileData;
