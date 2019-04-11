json.doctors do
  json.array!(@doctors["results"]) do |doctor|
    json.first_name doctor["basic"]["first_name"]
    json.last_name doctor["basic"]["last_name"]
    json.number doctor["number"]
    json.practice_location_address_1 doctor["addresses"][0]["address_1"]
    json.practice_location_city doctor["addresses"][0]["city"]
    json.practice_location_state doctor["addresses"][0]["state"]
    json.billing_address_1 doctor["addresses"][1]["address_1"]
    json.billing_city doctor["addresses"][1]["city"]
    json.billing_state doctor["addresses"][1]["state"]
  end
end