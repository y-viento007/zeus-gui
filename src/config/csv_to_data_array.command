cd `dirname $0`
echo "Convert tlm.csv to tlm_data_array.json"
jq -R -s -f form.jq tlm.csv > tlm_data_array.json