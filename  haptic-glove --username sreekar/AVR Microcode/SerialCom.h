
#include <avr/io.h> 
//#include <avr/interrupt.h>

#define F_CPU 8000000	// 8 MHz oscillator.
#define BaudRate 19200 //you may use 38.4k with same 0.2% error (see page 196)
#define MYUBRR (F_CPU / 16 / BaudRate) - 1 //see page 173 of Atmega168 datasheet

//a motor object
typedef struct motor {
	uint8_t port;
	uint8_t* portset;
} motor;

//we define types using data structures as our "objects"
//a vibration object
typedef struct vibration {
	int duration;
	int delay;

	//duty cycle vars
	int on_time;
	int off_time;

	motor motor;
} vibration;

//HapticGlove.c
extern void data_direction_setup();
extern void motor_switch (uint8_t port, uint8_t* portset, uint8_t turnOn );
extern void menu_display();
extern void kill_all_motors();
extern vibration get_vibration();

//SerialCom.c
extern unsigned char serialRead(void);
extern void serialWrite(unsigned char DataOut);
extern int setup_serial (void);

//main.c
extern vibration queue[8];


