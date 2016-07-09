'use strict';
 
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicatorIOS,
  NavigatorIOS,
  SwitchIOS,
  View,
  Text
} from 'react-native';

import {
  Cell,
  CustomCell,
  Section,
  TableView
} from 'react-native-tableview-simple';

var Swiper = require('react-native-swiper');
 
class Profile extends Component {
  render() {
    return (
      <View style={styles.stage}>
	      <ScrollView 
	      contentInset={{bottom:79}}
	      contentContainerStyle={styles.stage}>
	  	    <Swiper style={styles.photoContainer} 
	  	     height={256}
	  	     showsButtons={false}>
		        <View style={styles.slide1}>
		          <Text style={styles.text}>Hello Swiper</Text>
		        </View>
		        <View style={styles.slide2}>
		          <Text style={styles.text}>Beautiful</Text>
		        </View>
		        <View style={styles.slide3}>
		          <Text style={styles.text}>And simple</Text>
		        </View>
	        </Swiper>
	        <TableView style={styles.tableViewContainer}>
	          <Section hideHeader={true}>
	            <CustomCell style={{alignItems: 'center'}}
	            	cellHeight={150}
	            	isDisabled={true} 
	            	title="Info"/>
	          </Section>
	          <Section header="Events Attending">
	            <Cell cellstyle="Basic" accessory="DisclosureIndicator" title="Basic"/>
	            <Cell cellstyle="RightDetail" accessory="DetailDisclosure" title="RightDetail" detail="Detail" />
	            <Cell cellstyle="LeftDetail" accessory="Detail" title="LeftDetail" detail="Detail"/>
	            <Cell cellstyle="Subtitle" accessory="Checkmark" title="Subtitle" detail="No linebreakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"/>
	            <Cell cellstyle="Basic" accessory="Detail" title="Pressable w/ accessory" onPress={() => console.log('Heyho!')}/>
	          </Section>
	          <Section header="CUSTOMCELLS">
	            <CustomCell>
	              <Text style={{flex: 1, fontSize: 16}}>Loading</Text>
	              <ActivityIndicatorIOS/>
	            </CustomCell>
	            <CustomCell>
	              <Text style={{flex: 1, fontSize: 16}}>Switch</Text>
	              <SwitchIOS/>
	            </CustomCell>
	          </Section>
	        </TableView>
	      </ScrollView>
      </View>
    );
  }
};
 
var styles = StyleSheet.create({
  stage: {
    backgroundColor: '#1C1C1C',
    paddingBottom: 20,
  },

  photoContainer: {
  	flex: 1
  },

  tableViewContainer: {
  	flex: 1
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  }
});
module.exports = Profile;