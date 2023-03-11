function keysFoundAnd(keywords, data)
{
	for(i=0; i<keywords.length; i++)
	{
		if(!data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' ').trim(), "i")))
		{
			return false;
		}
	}
	return true;
}
function keysFoundOr(keywords, data)
{
	for(i=0; i<keywords.length; i++)
	{
		if(data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' ').trim(), "i")))
		{
			return true;
		}
	}
	return false;
}
function keysFoundAnd(keywords, data)
{
	for(i=0; i<keywords.length; i++)
	{
		if(!data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' '), "i")))
		{
			return false;
		}
	}
	return true;
}
function keysFoundOr(keywords, data)
{
	for(i=0; i<keywords.length; i++)
	{
		if(data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' '), "i")))
		{
			return true;
		}
	}
	return false;
}
function findNegativeKeys(keywords2,data)
{
	if(keywords2[0]=="")
	{
	return false
	}
	for(i=0; i<keywords2.length; i++)
	{
		if(data.match(new RegExp(keywords2[i], "i")))
		{
			return true;
		}
	}
	return false;
}
function getRndRefreshRange(min, max) {
	var rt = 1000;
	try{ 
		rt = Math.floor(Math.random() * (max - min + 1) ) + min;
	}catch(exc){}
	return rt;
}
chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if((response.action == 'true')&&(response.site == 'kyliecosmetics.com/en-us')){
		var KeywordsType = response.KeywordsType;
		var searchKeywordYesNo = response.searchKeywordYesNo;
		var	keywords = response.keywords;
        var	keywords2 = response.keywords2;
        var timeoutMin = Number(response.timeOut);    
        var timeoutMax = Number(response.timeoutMax);
		var productSearch = response.productSearch; 	
        var autocheckoutselect = response.autocheckoutselect;
        var checkoutType = response.checkoutType;
        var checkoutDelay = response.checkoutDelay;
        
        var billCountry = response.billCountry;
        var billFirstName = response.billFirstName;
        var billLastName = response.billLastName;
        var billStreetAddress1 = response.billStreetAddress1;
        var billStreetAddress2 = response.billStreetAddress2;
        var billZipCode = response.billZipCode;
        var billCity = response.billCity;
        var billState = response.billState;
        var billPhone = response.billPhone;
        var billEmail = response.billEmail;
 
		var billStateShort=response.billStateShort;

        var billStateKythnyc = response.billStateKythnyc;
		var shipStateKythnyc = response.newStateKythnyc; 
		var shipStateShort = response.shipStateShort;
		var shipCountryShort = response.shipCountryShort;	
        var shippingAddress = response.shippingAddress;
        var shipCountry = response.newCountry;
        var shipFirstName = response.newFirstName;
        var shipLastName = response.newLastName;
        var shipStreetAddress1 = response.newStreetAddress1;
        var shipStreetAddress2 = response.newStreetAddress2;
        var shipZipCode = response.newZipCode;
        var shipCity = response.newCity;
        var shipState = response.newState;
        var shipPhone = response.newPhone;
        var shipEmail = response.newEmail;
        
        var paymentMethod = response.paymentMethod;
        var paymentCard = response.paymentCard;
        var cardNumber = response.cardNumber;
        var expireMonth = response.expireMonth;
        var expireYear = response.expireYear;
        var cardCVV = response.cardCVV;
        var paypalEmail = response.paypalEmail;
        var paypalPassword = response.paypalPassword;
        var nameOnCard = response.cardHolderName;
        //expireYear = "20".concat(expireYear);
        
		$(function(){
            var refresh=true;  
            try{
				keywords=keywords.trim();
				keywords=keywords.split(",");
			}catch(err){}
			try{
				keywords2=keywords2.trim();
				keywords2=keywords2.split(",");
			}catch(err){}
			if(productSearch!=="Manually"){	
				vv = setInterval(function(){
					if($(".product-result").is(":visible")){
						clearInterval(vv);
						try{						
							var a = document.getElementsByClassName("product-card");
							for(var i=0; i<a.length ; i++){
								var b = a[i].textContent.replace(/\s{2,}/g, ' ');	
								if(KeywordsType=="and"){
									if(keysFoundAnd(keywords, b)&&(!findNegativeKeys(keywords2,b))){
										a[i].getElementsByTagName("a")[0].click();	
										return;
									}
								}else{
									if((keysFoundOr(keywords, b))&&(!findNegativeKeys(keywords2,b))){
										a[i].getElementsByTagName("a")[0].click();	
										return;
									}									
								}	
							}
						}catch(ex){}
						setTimeout(function(){	
							location.reload();
						},getRndRefreshRange(timeoutMin, timeoutMax));
					}    
				}, 500);
			}
           				
			v = setInterval(function(){ 				
				if($(".product-detail").is(":visible") && !$(".product-result").is(":visible")){
					try{
						clearInterval(v);
						if(!$(".add-to-cart__label:contains('Out of Stock')").is(":visible") && !$(".button--notify__me").is(":visible")){
							document.getElementsByClassName("add-to-cart")[0].getElementsByTagName("button")[0].click();
							return;
						}
					}catch(ex){}								
					setTimeout(function(){	
						location.reload();
					},getRndRefreshRange(timeoutMin, timeoutMax));
				}					
            },500);          
				                               
            if(autocheckoutselect==="yes"){ 	
				v1 = setInterval(function(){ 				
					if($(".ui-mini-cart__checkout-button").is(":visible") && $(".product-detail").is(":visible")){
						try{
							clearInterval(v1);
							document.getElementsByClassName("ui-mini-cart__checkout-button")[0].click();
						}catch(err){}
					}					
				},500);    			              	                                             
				v3 = setInterval(function(){
					if($("[data-section='customer-information']").is(":visible")){
						clearInterval(v3);						
						try{						
							if($("#checkout_shipping_address_first_name").is(":visible")){
								try{
									if($("#checkout_email").is(":visible") || $("#checkout_email_or_phone").is(":visible")){  
										$("#checkout_email").val("");
										try{$("#checkout_email").sendkeys(shipEmail);}catch(err){}
										$("#checkout_email_or_phone").val("");
										try{$("#checkout_email_or_phone").sendkeys(shipEmail);}catch(err){}
									}
								}catch(err){}
								$("#checkout_shipping_address_first_name").val(shipFirstName);
								$("#checkout_shipping_address_last_name").val(shipLastName);
								$("#checkout_shipping_address_address1").val(shipStreetAddress1);
								$("#checkout_shipping_address_address2").val(shipStreetAddress2);
								$("#checkout_shipping_address_city").val(shipCity);
								$("#checkout_shipping_address_country").val(shipCountry);
								
								var s=document.getElementById("checkout_shipping_address_province");
								for(var i=0; i<s.length; i++){
									if(s.options[i].value==shipStateShort){
										s.options[i].selected=true;
										s.dispatchEvent(new Event("change", { bubbles: true }));
										break;
									}
								}
								$("#checkout_shipping_address_zip").val(shipZipCode);
								$("#checkout_shipping_address_phone").val(shipPhone);   
								if(!$(".g-recaptcha").is(":visible"))
								{
									setTimeout(function(){ 
										$('[name="button"]').click();
									},300); 
								}
							}
							else if($("#checkout_billing_address_first_name").is(":visible")){
								try{
									if($("#checkout_email").is(":visible")||$("#checkout_email_or_phone").is(":visible")){  
										$("#checkout_email").val("");
										$("#checkout_email").sendkeys(shipEmail);
										$("#checkout_email_or_phone").val("");
										$("#checkout_email_or_phone").sendkeys(shipEmail);
									}
								}catch(err){}
								$("#checkout_billing_address_first_name").val(billFirstName);
								$("#checkout_billing_address_last_name").val(billLastName);
								$("#checkout_billing_address_address1").val(billStreetAddress1);
								$("#checkout_billing_address_address2").val(billStreetAddress2);
								$("#checkout_billing_address_city").val(billCity);
								$("#checkout_billing_address_country").val(billCountry).change();
								var s=document.getElementById("checkout_billing_address_province");
								for(var i=0; i<s.length; i++){
									if(s.options[i].value==billStateShort){
										s.options[i].selected=true;
										s.dispatchEvent(new Event("change", { bubbles: true }));
										break;
									}
								}
								$("#checkout_billing_address_zip").val(billZipCode);
								$("#checkout_billing_address_phone").val(billPhone);   
								if(!$(".g-recaptcha").is(":visible"))
								{
									setTimeout(function(){ 
										$('[name="button"]').click();
									},300); 
								}
							} 
						}catch(err){console.log(err)}
					}                  
				},50); 			
				v4 = setInterval(function(){ 
					try{
						if($(".recaptcha-checkbox-checkmark").is(":visible") && (!$("#error-for-captcha").is(":visible")) && !$(".recaptcha-checkbox-checked").is(":visible"))
						{    
							$(".recaptcha-checkbox-checkmark").click();
							clearInterval(v4);
						}
					}catch(err){}
				},100);
				
				v5 = setInterval(function(){ 
					try{
						if(document.getElementById("g-recaptcha-response").value)
						{         							
							clearInterval(v5);
							$("#continue_button").click();
						}
					}catch(err){}
				},300);
				
				v6 = setInterval(function(){ 					
					if($('[name="checkout\\[shipping_rate\\]\\[id\\]"]').is(":visible"))
					{
						$('[name="button"]').click();
						clearInterval(v6);
					}                
				}, 50);
			
				v7 = setInterval(function(){ 
					try{
						if($('[name="checkout\\[payment_gateway\\]"]').is(":visible"))
						{    
							if(paymentMethod == "creditCard"){						
								document.getElementsByName("checkout[payment_gateway]")[0].click();
							}else{
								document.getElementsByName("checkout[payment_gateway]")[1].click();
								try{$('#continue_button:contains("Complete order")').click();}catch(err){}
								try{$('#continue_button:contains("Pay now")').click();}catch(err){}
							}								
							clearInterval(v7);                              
						}
					}catch(err){}
				},10);
				
				v8 = setInterval(function(){
					try{					
						var oops =  document.getElementsByClassName("content")[0];
						clearInterval(v8);
						if(oops !== null)
						{						
							if(document.getElementsByClassName("content--desc-large")[0].textContent.match("Oops, something went wrong.")){
								setTimeout(function(){	
									location.reload();
								},getRndRefreshRange(timeoutMin, timeoutMax));
							}
						}
					}catch(err){}
				},50);
				
				v9 = setInterval(function(){ 
					try{
						if($('#number').is(":visible"))
						{   
							clearInterval(v9);	
							$('#number').val(cardNumber);
							document.getElementById('number').dispatchEvent(new Event("change", { bubbles: true }));
							$('#name').val(nameOnCard);
							document.getElementById('name').dispatchEvent(new Event("change", { bubbles: true }));
							$('#expiry').val(expireMonth+"/"+expireYear);
							document.getElementById('expiry').dispatchEvent(new Event("change", { bubbles: true }));
							$('#verification_value').val(cardCVV);
							document.getElementById('verification_value').dispatchEvent(new Event("change", { bubbles: true }));
						}
					}catch(err){console.log(err)}
				},50);
				
				v10 = setInterval(function(){ 
					if(shippingAddress=="new"){
						try{
							$("#checkout_different_billing_address_true").click();						
							if($("#checkout_billing_address_first_name").is(":visible")){
								alert("Hii");
								clearInterval(v10);	
								$("#checkout_billing_address_first_name").val(billFirstName);
								$("#checkout_billing_address_last_name").val(billLastName);
								$("#checkout_billing_address_address1").val(billStreetAddress1);
								$("#checkout_billing_address_address2").val(billStreetAddress2);
								$("#checkout_billing_address_city").val(billCity);
								$("#checkout_billing_address_country").val(billCountry).change();
								$("#checkout_billing_address_province").val(billStateShort).change();
								$("#checkout_billing_address_zip").val(billZipCode);
								$("#checkout_billing_address_phone").val(billPhone);   
								if($('#continue_button:contains("Complete order")').is(":visible") || $('#continue_button:contains("Pay now")').is(":visible")){
									try{
										$('.card-fields-iframe').eq(3).load(function(){
											$('#checkout_different_billing_address_false').click();								
											setTimeout(function(){							
												$('#continue_button:contains("Complete order")').click();
												$('#continue_button:contains("Pay now")').click();
											},200);
										});	
									}catch(err){}								
								}
							}
						}catch(err){}
					}else{
						if($('#continue_button:contains("Complete order")').is(":visible") || $('#continue_button:contains("Pay now")').is(":visible")){
							try{
								clearInterval(v10);
								$('.card-fields-iframe').eq(3).load(function(){
									$('#checkout_different_billing_address_false').click();								
									setTimeout(function(){							
										$('#continue_button:contains("Complete order")').click();
										$('#continue_button:contains("Pay now")').click();
									},200);
								});	
							}catch(err){}								
						}
					}
				},100);											
			}
		});
	}
});
