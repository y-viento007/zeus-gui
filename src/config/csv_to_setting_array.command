cd `dirname $0`
echo "Convert tlm.csv to tlm_element_setting_array.json"
jq -R -s -f form.jq tlm.csv > tlm_element_setting_array.json