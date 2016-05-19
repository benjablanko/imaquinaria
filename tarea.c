#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define N 10
#define M 20
#define CAMINO '*'
#define TRUE 1
#define FALSE 0
//entrada del laberinto
int xi;
int yi;
//matriz
int laberinto[N][M];
//funciones
int recorrer(int filas, int columnas);
int valido(int f, int c);
void mostrar();

int main(void){
	int i=0,j=0,q=0;
	FILE *archivo;
	archivo=fopen("laberinto2.txt","r");
	if(archivo==NULL){
		printf("No existe el archivo\n");
	}
	/*
	for(i=0; i<N; i++){
		for(j=0; j<M; j++){
			laberinto[i][j]=0;
		}
	}*/
	for(i=0; i<N; i++){
		for(j=0; j<M; j++){
			fscanf(archivo, "%c" ,&laberinto[i][j]);
			if(laberinto[i][j]==69 || laberinto[i][j]==101){
				xi=i;
				yi=j;
			}
			while(laberinto[i][j]<32){
				fscanf(archivo, "%c" ,&laberinto[i][j]);
			}
		}
	}
	fclose(archivo);
	mostrar();
	int ok;
	ok=recorrer(xi,yi);
	if(ok==1){
		printf("tiene solucion\n");
	}
	mostrar();
	return 0;
}
void mostrar(){
	int i, j;
	printf("\n");
	for(i=0; i<N; i++){
		for(j=0; j<M; j++){
			printf("%c" ,laberinto[i][j]);
		}
		printf("\n");
	}
}
int valido(int f, int c){
	int resultado=TRUE; //posicion valida;
	if((f<0) || f>=N || (c<0) || c>=M)
		resultado=FALSE;
	if(laberinto[f][c]==35 || laberinto[f][c]==42){
		resultado=FALSE;
	}
}
int recorrer(int filas, int columnas){
	int okey=FALSE;
	if(laberinto[filas][columnas]==83 || laberinto[filas][columnas]==115){
		okey=TRUE;
		laberinto[filas][columnas]=CAMINO;
	}
	if(!okey && valido(filas,columnas-1)){
		okey=recorrer(filas,columnas-1);
		laberinto[filas][columnas]=CAMINO;
	}
	if(!okey && valido(filas,columnas+1)){
		okey=recorrer(filas,columnas+1);
		laberinto[filas][columnas]=CAMINO;
	}		
	if(!okey && valido(filas-1,columnas)){
		okey=recorrer(filas-1,columnas);
		laberinto[filas][columnas]=CAMINO;
	}
	if(!okey && valido(filas+1,columnas)){
		okey=recorrer(filas+1,columnas);
		laberinto[filas][columnas]=CAMINO;
	}
	if(!okey){
		laberinto[filas][columnas]=32;
	}

return okey;
}