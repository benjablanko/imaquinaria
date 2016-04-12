(function(){

	"use strict";
	//Nuestro primer Service (Factory)
	angular
		.module('miApp')
		.service('Shop',Shop);

		
		Shop.$inject = ['$rootScope','$sessionStorage']; 

		function Shop($rootScope, $sessionStorage) {
			var vm = this;
			vm.items = [];
			vm.minimRequeriments = minimRequeriments;
			vm.isInteger = isInteger;
			vm.checkExistsProduct = checkExistsProduct;
			vm.add = add;
			vm.remove = remove;
			vm.destroy = destroy;
			vm.dataPayPal = dataPayPal;
			$rootScope.udpShopContent = [];
			$rootScope.udpShopTotalPrice = 0;
			$rootScope.udpShopTotalProducts = 0;
			debugger;
			if($sessionStorage.exist === "true"){
				$rootScope.udpShopContent = JSON.parse($sessionStorage.udpShopContent)
				$rootScope.udpShopTotalPrice = parseFloat($sessionStorage.udpShopTotalPrice);
				$rootScope.udpShopTotalProducts = parseInt($sessionStorage.udpShopTotalProducts);
			}

			function minimRequeriments(product)
			{
				if(!product.qty || !product.price || !product.id)
				{
					throw new Error("Los campos qty, price y id son necesarios");
				}
				if(isNaN(product.qty) || isNaN(product.price) || isNaN(product.id))
				{
					throw new Error("Los campos qty, price y id deben ser númericos");
				}
				if(product.qty <= 0)
				{
					throw new Error("La cantidad añadida debe ser mayor de 0");
				}
				if(vm.isInteger(product.qty) === false)
				{
					throw new Error("La cantidad del producto debe ser un número entero");
				}
			}
			/**
			* @desc - comprueba si el número pasado es un entero
			* @return - bool
			*/
			function isInteger(n) 
			{
				if(n % 1 === 0)
					return true;
				else
					return false;
			}
			/**
			* @desc - añade nuevos productos al carrito
			* @param - array con los datos del producto
			* @return - mixed
			*/
			function add(producto)
			{
				try{
					
					$sessionStorage.exist = "true";
					//comprobamos si el producto cumple los requisitos
					this.minimRequeriments(producto);
					//si el producto existe le actualizamos la cantidad
					if(this.checkExistsProduct(producto,$rootScope.udpShopContent) === true)
					{
						$rootScope.udpShopTotalPrice += parseFloat(producto.price * producto.qty,10);

						$rootScope.udpShopTotalProducts += 	producto.qty;

						$sessionStorage.udpShopTotalPrice  = $rootScope.udpShopTotalPrice.toString();

						$sessionStorage.udpShopTotalProducts = $rootScope.udpShopTotalProducts.toString();

						$sessionStorage.udpShopContent = JSON.stringify($rootScope.udpShopContent);
						return {"msg":"updated"};
					}
					//en otro caso, lo añadimos al carrito
					else
					{
						$rootScope.udpShopTotalPrice += parseFloat(producto.price * producto.qty,10);
						$rootScope.udpShopTotalProducts += producto.qty;
						$rootScope.udpShopContent.push(producto);

						$sessionStorage.udpShopTotalPrice  = $rootScope.udpShopTotalPrice.toString();
						$sessionStorage.udpShopTotalProducts = $rootScope.udpShopTotalProducts.toString();
						$sessionStorage.udpShopContent = JSON.stringify($rootScope.udpShopContent);
						return {"msg":"insert"};
					}
				}
				catch(error)
				{	
					$sessionStorage.exist = "false";
					alert("Error " + error);
				}
			}
			/**
			* @desc - comprueba si el producto existe en el carrito
			* @param - product - objecto con los datos del producto a añadir
			* @param - products - array con el contenido del carrito
			* @return - bool
			*/
			function checkExistsProduct(product, products) 
			{
				var i, len;
				for (i = 0, len = products.length; i < len; i++) 
				{
					if (products[i].id === product.id) 
					{	   	
						products[i].qty += product.qty;  
						return true;
					}
				}
				return false;
			}
			/**
			* @desc -elimina un producto completo por su id
			* @param - int - id del producto
			* @return - mixed
			*/

			function remove(id)
			{
				debugger;
				try{
					var i, len;
					for (i = 0, len = $rootScope.udpShopContent.length; i < len; i++) 
					{
						if ($rootScope.udpShopContent[i].id === id) 
						{
							$rootScope.udpShopTotalPrice -= parseFloat($rootScope.udpShopContent[i].price * $rootScope.udpShopContent[i].qty,10);
							$rootScope.udpShopTotalProducts -= $rootScope.udpShopContent[i].qty;
							$rootScope.udpShopContent.splice(i, 1);

							$sessionStorage.udpShopTotalPrice  = $rootScope.udpShopTotalPrice.toString();
							$sessionStorage.udpShopTotalProducts = $rootScope.udpShopTotalProducts.toString();
							$sessionStorage.udpShopContent = JSON.stringify($rootScope.udpShopContent);

							if(isNaN($rootScope.udpShopTotalPrice))
							{
								$sessionStorage.$reset();
								$sessionStorage.exist = "false";
							}
							return {"msg":"deleted"};
						}
					}
				}
				catch(error)
				{
					alert("Error " + error);
				}
			}
			/**
			* @desc - elimina todo el contenido del carrito, precio total y productos
			* @return - bool
			*/
			function destroy()
			{
				try{
					$sessionStorage.$reset();
					$sessionStorage.exist = "false";

					$rootScope.udpShopContent = [];
					$rootScope.udpShopTotalPrice = 0;
					$rootScope.udpShopTotalProducts = 0;
				}
				catch(error)
				{
					alert("Error " + error);
				}
			}

		function dataPayPal(userData, costoEnvio)
		{
			var htmlForm = "<form name='cart' action='https://www.sandbox.paypal.com/cgi-bin/webscr' method='post' id='formPaypal'>";
			for (var i = 0, len = $rootScope.udpShopContent.length; i < len; i++) 
			{
				var product = $rootScope.udpShopContent[i];
				var currentProduct = i + 1;
				htmlForm += "<input type='hidden' name='item_number_"+currentProduct+"' value="+product.id+" />";
				htmlForm += "<input type='hidden' name='item_name_"+currentProduct+"' value='"+product.name+"' />";
				htmlForm += "<input type='hidden' name='quantity_"+currentProduct+"' value="+product.qty+" />";
				htmlForm += "<input type='hidden' name='amount_"+currentProduct+"' value="+product.price.toFixed(2)+" />";
			}

				currentProduct = currentProduct + 1;
				htmlForm += "<input type='hidden' name='item_number_"+currentProduct+"' value="+123111+" />";
				htmlForm += "<input type='hidden' name='item_name_"+currentProduct+"' value='"+"shipping Cost"+"' />";
				htmlForm += "<input type='hidden' name='quantity_"+currentProduct+"' value="+1+" />";
				htmlForm += "<input type='hidden' name='amount_"+currentProduct+"' value="+costoEnvio+" />";


			htmlForm += "<input type='hidden' name='cmd' value='"+userData.cmd+"' />";
			htmlForm += "<input type='hidden' name='upload' value='"+userData.upload+"' />";
			htmlForm += "<input type='hidden' name='business' value='"+userData.business+"' />";
			htmlForm += "<input type='hidden' name='cancel_return' value='"+userData.cancelUrl+"' />";
			htmlForm += "<input type='hidden' name='cbt' value='"+userData.msgReturn+"' />";
			htmlForm += "<input type='hidden' name='return' value='"+userData.successUrl+"' />";
			htmlForm += "<input type='hidden' name='rm' value="+userData.rm+ " />";
			htmlForm += "<input type='hidden' name='lc' value='"+userData.lc+"' />";
			htmlForm += "<input type='hidden' name='currency_code' value='"+userData.currencyCode+"' />";
			htmlForm += "<input type='hidden' name='cbt' value='"+userData.cbt+"' />";
			htmlForm += "<input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'>";
			htmlForm += "<img alt=' border='0' src='https://www.paypalobjects.com/es_XC/i/scr/pixel.gif' width='1' height='1'>";
			htmlForm += "</form>";
			

	

			$("#paypalContent").html("").append(htmlForm);
			//$("#asd").html("").append(htmlForm);
		}


			/**
			* @desc - prepara el formulario hacía paypal con el contenido del carrito y los datos
			* que ha establecido el usuario previamente
			* @param - userData - datos de la tienda para el formulario de paypal
			*/
			/*function dataPayPal(userData, costoEnvio)
			{

				var htmlForm = "";
				for (var i = 0, len = $rootScope.udpShopContent.length; i < len; i++) 
				{
					var product = $rootScope.udpShopContent[i];
					var currentProduct = i + 1;
					htmlForm += "<input type='hidden' name='item_number_"+currentProduct+"' value="+product.id+" />";
					htmlForm += "<input type='hidden' name='item_name_"+currentProduct+"' value='"+product.name+"' />";
					htmlForm += "<input type='hidden' name='quantity_"+currentProduct+"' value="+product.qty+" />";
					htmlForm += "<input type='hidden' name='amount_"+currentProduct+"' value="+product.price.toFixed(2)+" />";
				}
				currentProduct = currentProduct + 1;
				htmlForm += "<input type='hidden' name='item_number_"+currentProduct+"' value="+123111+" />";
				htmlForm += "<input type='hidden' name='item_name_"+currentProduct+"' value='"+"shipping Cost"+"' />";
				htmlForm += "<input type='hidden' name='quantity_"+currentProduct+"' value="+1+" />";
				htmlForm += "<input type='hidden' name='amount_"+currentProduct+"' value="+costoEnvio+" />";


				htmlForm += "<input type='hidden' name='cmd' value='"+userData.cmd+"' />";
				htmlForm += "<input type='hidden' name='upload' value='"+userData.upload+"' />";
				htmlForm += "<input type='hidden' name='business' value='"+userData.business+"' />";
				htmlForm += "<input type='hidden' name='cancel_return' value='"+userData.cancelUrl+"' />";
				htmlForm += "<input type='hidden' name='cbt' value='"+userData.msgReturn+"' />";
				htmlForm += "<input type='hidden' name='return' value='"+userData.successUrl+"' />";
				htmlForm += "<input type='hidden' name='rm' value="+userData.rm+ " />";
				htmlForm += "<input type='hidden' name='lc' value='"+userData.lc+"' />";
				htmlForm += "<input type='hidden' name='currency_code' value='"+userData.currencyCode+"' />";
				htmlForm += "<input type='hidden' name='cbt' value='"+userData.cbt+"' />";
				debugger;
				//$("#formPaypal2").html("").append(htmlForm);
				$("#formPaypal").html("").append(htmlForm);
				//angular.element(("#formPaypal").html("").append(htmlForm));
				//angular.element((userData.formClass).html("").append(htmlForm));
			}*/
		}
})();