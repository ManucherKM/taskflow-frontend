import { cn } from '@/lib/utils'

type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
	logoBlack: (props: IconProps) => (
		<svg
			width="103.9"
			height="20"
			viewBox="0 0 1000 194"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_38_75)">
				<g clipPath="url(#clip1_38_75)">
					<g clipPath="url(#clip2_38_75)">
						<g clipPath="url(#clip3_38_75)">
							<g clipPath="url(#clip4_38_75)">
								<g clipPath="url(#clip5_38_75)">
									<g clipPath="url(#clip6_38_75)">
										<path
											d="M89.4668 32.964V46.9534H53.6067V165.765H37.647V46.9534H1.78695V32.964H89.4668ZM138.134 153.745C145.227 153.745 150.876 151.736 155.079 147.716C159.282 143.723 161.384 138.64 161.384 132.466V119.659H144.045C135.638 119.659 129.333 121.301 125.13 124.585C120.927 127.868 118.825 132.006 118.825 136.998C118.825 141.989 120.467 146.022 123.751 149.096C127.035 152.196 131.829 153.745 138.134 153.745ZM161.581 165.765V153.943C156.458 162.481 147.132 166.75 133.602 166.75C124.276 166.75 116.749 163.991 111.022 158.474C105.321 152.957 102.471 145.996 102.471 137.589C102.471 128 106.11 120.539 113.387 115.206C120.69 109.899 130.647 107.246 143.257 107.246H161.384V102.123C161.384 94.2414 159.611 88.291 156.064 84.2715C152.518 80.2783 146.541 78.2817 138.134 78.2817C127.494 78.2817 118.037 81.1058 109.761 86.7541V71.1885C117.249 66.591 127.1 64.2923 139.316 64.2923C164.405 64.2923 176.95 77.0338 176.95 102.517V165.765H161.581ZM264.63 139.165C264.63 147.703 261.635 154.468 255.645 159.459C249.681 164.451 241.511 166.947 231.134 166.947C219.049 166.947 209.263 164.911 201.776 160.839V145.667C210.577 150.921 220.034 153.548 230.149 153.548C236.191 153.548 240.788 152.366 243.941 150.002C247.094 147.637 248.67 144.419 248.67 140.347C248.67 135.618 246.923 131.94 243.429 129.313C239.961 126.686 234.155 123.731 226.011 120.447C218.524 117.557 212.508 113.945 207.963 109.61C203.444 105.275 201.185 99.4299 201.185 92.074C201.185 83.7986 204.298 77.1914 210.524 72.2525C216.777 67.3398 224.566 64.8834 233.892 64.8834C244.269 64.8834 252.611 66.3283 258.916 69.2182V83.9957C252.873 80.3177 244.598 78.4787 234.089 78.4787C228.835 78.4787 224.658 79.6872 221.558 82.1041C218.484 84.5474 216.947 87.6736 216.947 91.4829C216.947 93.8473 217.407 95.9096 218.327 97.6698C219.246 99.4562 221.046 101.203 223.725 102.911C226.431 104.618 228.402 105.761 229.636 106.339C230.897 106.943 233.63 108.165 237.833 110.004C246.24 113.419 252.808 117.294 257.536 121.629C262.265 125.964 264.63 131.809 264.63 139.165ZM301.041 27.25V165.765H285.673V27.25H301.041ZM360.742 65.8686L321.336 113.354L361.925 165.765H343.206L303.012 113.354L342.221 65.8686H360.742ZM447.043 94.0444V108.034H396.997V165.765H381.037V32.964H453.939V46.9534H396.997V94.0444H447.043ZM492.952 26.4619V165.765H477.386V26.4619H492.952ZM610.384 116.112C610.384 130.955 606.18 143.237 597.774 152.957C589.367 162.678 577.808 167.538 563.096 167.538C548.778 167.538 537.442 162.704 529.088 153.036C520.76 143.395 516.596 131.218 516.596 116.506C516.596 101.663 520.891 89.2762 529.482 79.3457C538.099 69.4415 549.303 64.4894 563.096 64.4894C578.202 64.4894 589.853 69.3495 598.05 79.0698C606.272 88.7901 610.384 101.138 610.384 116.112ZM532.753 116.309C532.753 126.686 535.511 135.513 541.028 142.79C546.545 150.094 553.901 153.745 563.096 153.745C573.079 153.745 580.763 150.159 586.149 142.987C591.534 135.842 594.227 126.949 594.227 116.309C594.227 105.275 591.666 96.1723 586.543 89.0003C581.42 81.8546 573.604 78.2817 563.096 78.2817C553.638 78.2817 546.217 81.9597 540.831 89.3156C535.445 96.6715 532.753 105.669 532.753 116.309ZM682.656 133.057L673.592 165.765H654.48L623.743 65.8686H640.293L649.948 98.9702C653.363 110.529 656.227 120.604 658.539 129.195C660.824 137.812 662.296 143.565 662.952 146.455L663.937 150.593C665.908 142.186 670.702 124.913 678.321 98.7732L687.779 65.8686H704.329L713.984 98.7732L728.762 150.79C730.601 143.04 735.658 125.701 743.933 98.7732L753.982 65.8686H769.942L738.416 165.765H719.304L709.846 133.057L696.054 83.2075C694.084 91.6143 689.618 108.231 682.656 133.057Z"
											fill="black"
										/>
									</g>
								</g>
							</g>
						</g>
						<g clipPath="url(#clip7_38_75)">
							<path
								d="M856.576 -0.483398H803.286V194.484H856.576V-0.483398Z"
								fill="black"
							/>
							<path
								d="M921.566 -0.483398H868.275V194.484H921.566V-0.483398Z"
								fill="black"
								fillOpacity="0.75"
							/>
							<path
								d="M986.555 -0.483398H933.264V194.484H986.555V-0.483398Z"
								fill="black"
								fillOpacity="0.5"
							/>
						</g>
					</g>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_38_75">
					<rect width="1000" height="194" fill="white" />
				</clipPath>
				<clipPath id="clip1_38_75">
					<rect
						width="996.505"
						height="194.967"
						fill="white"
						transform="translate(1.74753 -0.483398)"
					/>
				</clipPath>
				<clipPath id="clip2_38_75">
					<rect
						width="996.505"
						height="194.967"
						fill="white"
						transform="translate(1.74753 -0.483398)"
					/>
				</clipPath>
				<clipPath id="clip3_38_75">
					<rect
						width="768.233"
						height="141.076"
						fill="white"
						transform="translate(1.74754 26.4619)"
					/>
				</clipPath>
				<clipPath id="clip4_38_75">
					<rect
						width="768.233"
						height="141.076"
						fill="white"
						transform="translate(1.74754 26.4619)"
					/>
				</clipPath>
				<clipPath id="clip5_38_75">
					<rect
						width="768.233"
						height="141.076"
						fill="white"
						transform="translate(1.74754 26.4619)"
					/>
				</clipPath>
				<clipPath id="clip6_38_75">
					<rect
						width="768.233"
						height="141.076"
						fill="white"
						transform="translate(1.74754 26.4619)"
					/>
				</clipPath>
				<clipPath id="clip7_38_75">
					<rect
						width="194.967"
						height="194.967"
						fill="white"
						transform="translate(803.286 -0.483398)"
					/>
				</clipPath>
			</defs>
		</svg>
	),
	logoWhite: (props: IconProps) => (
		<svg
			width="103.9"
			height="20"
			viewBox="0 0 1000 194"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_38_51)">
				<g clipPath="url(#clip1_38_51)">
					<g clipPath="url(#clip2_38_51)">
						<g clipPath="url(#clip3_38_51)">
							<g clipPath="url(#clip4_38_51)">
								<g clipPath="url(#clip5_38_51)">
									<g clipPath="url(#clip6_38_51)">
										<path
											d="M89.4668 32.964V46.9534H53.6067V165.765H37.647V46.9534H1.78695V32.964H89.4668ZM138.134 153.745C145.227 153.745 150.876 151.736 155.079 147.716C159.282 143.723 161.384 138.64 161.384 132.466V119.659H144.045C135.638 119.659 129.333 121.301 125.13 124.585C120.927 127.868 118.825 132.006 118.825 136.998C118.825 141.989 120.467 146.022 123.751 149.096C127.035 152.196 131.829 153.745 138.134 153.745ZM161.581 165.765V153.943C156.458 162.481 147.132 166.75 133.602 166.75C124.276 166.75 116.749 163.991 111.022 158.474C105.321 152.957 102.471 145.996 102.471 137.589C102.471 128 106.11 120.539 113.387 115.206C120.69 109.899 130.647 107.246 143.257 107.246H161.384V102.123C161.384 94.2414 159.611 88.291 156.064 84.2715C152.518 80.2783 146.541 78.2817 138.134 78.2817C127.494 78.2817 118.037 81.1058 109.761 86.7541V71.1885C117.249 66.591 127.1 64.2923 139.316 64.2923C164.405 64.2923 176.95 77.0338 176.95 102.517V165.765H161.581ZM264.63 139.165C264.63 147.703 261.635 154.468 255.645 159.459C249.681 164.451 241.511 166.947 231.134 166.947C219.049 166.947 209.263 164.911 201.776 160.839V145.667C210.577 150.921 220.034 153.548 230.149 153.548C236.191 153.548 240.788 152.366 243.941 150.002C247.094 147.637 248.67 144.419 248.67 140.347C248.67 135.618 246.923 131.94 243.429 129.313C239.961 126.686 234.155 123.731 226.011 120.447C218.524 117.557 212.508 113.945 207.963 109.61C203.444 105.275 201.185 99.4299 201.185 92.074C201.185 83.7986 204.298 77.1914 210.524 72.2525C216.777 67.3398 224.566 64.8834 233.892 64.8834C244.269 64.8834 252.611 66.3283 258.916 69.2182V83.9957C252.873 80.3177 244.598 78.4787 234.089 78.4787C228.835 78.4787 224.658 79.6872 221.558 82.1041C218.484 84.5474 216.947 87.6736 216.947 91.4829C216.947 93.8473 217.407 95.9096 218.327 97.6698C219.246 99.4562 221.046 101.203 223.725 102.911C226.431 104.618 228.402 105.761 229.636 106.339C230.897 106.943 233.63 108.165 237.833 110.004C246.24 113.419 252.808 117.294 257.536 121.629C262.265 125.964 264.63 131.809 264.63 139.165ZM301.041 27.25V165.765H285.673V27.25H301.041ZM360.742 65.8686L321.336 113.354L361.925 165.765H343.206L303.012 113.354L342.221 65.8686H360.742ZM447.043 94.0444V108.034H396.997V165.765H381.037V32.964H453.939V46.9534H396.997V94.0444H447.043ZM492.952 26.4619V165.765H477.386V26.4619H492.952ZM610.384 116.112C610.384 130.955 606.18 143.237 597.774 152.957C589.367 162.678 577.808 167.538 563.096 167.538C548.778 167.538 537.442 162.704 529.088 153.036C520.76 143.395 516.596 131.218 516.596 116.506C516.596 101.663 520.891 89.2762 529.482 79.3457C538.099 69.4415 549.303 64.4894 563.096 64.4894C578.202 64.4894 589.853 69.3495 598.05 79.0698C606.272 88.7901 610.384 101.138 610.384 116.112ZM532.753 116.309C532.753 126.686 535.511 135.513 541.028 142.79C546.545 150.094 553.901 153.745 563.096 153.745C573.079 153.745 580.763 150.159 586.149 142.987C591.534 135.842 594.227 126.949 594.227 116.309C594.227 105.275 591.666 96.1723 586.543 89.0003C581.42 81.8546 573.604 78.2817 563.096 78.2817C553.638 78.2817 546.217 81.9597 540.831 89.3156C535.445 96.6715 532.753 105.669 532.753 116.309ZM682.656 133.057L673.592 165.765H654.48L623.743 65.8686H640.293L649.948 98.9702C653.363 110.529 656.227 120.604 658.539 129.195C660.824 137.812 662.296 143.565 662.952 146.455L663.937 150.593C665.908 142.186 670.702 124.913 678.321 98.7732L687.779 65.8686H704.329L713.984 98.7732L728.762 150.79C730.601 143.04 735.658 125.701 743.933 98.7732L753.982 65.8686H769.942L738.416 165.765H719.304L709.846 133.057L696.054 83.2075C694.084 91.6143 689.618 108.231 682.656 133.057Z"
											fill="white"
										/>
									</g>
								</g>
							</g>
						</g>
						<g clipPath="url(#clip7_38_51)">
							<path
								d="M856.576 -0.483398H803.286V194.484H856.576V-0.483398Z"
								fill="white"
							/>
							<path
								d="M921.566 -0.483398H868.275V194.484H921.566V-0.483398Z"
								fill="white"
								fillOpacity="0.75"
							/>
							<path
								d="M986.555 -0.483398H933.264V194.484H986.555V-0.483398Z"
								fill="white"
								fillOpacity="0.5"
							/>
						</g>
					</g>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_38_51">
					<rect width="1000" height="194" fill="white" />
				</clipPath>
				<clipPath id="clip1_38_51">
					<rect
						width="996.505"
						height="194.967"
						fill="white"
						transform="translate(1.74753 -0.483398)"
					/>
				</clipPath>
				<clipPath id="clip2_38_51">
					<rect
						width="996.505"
						height="194.967"
						fill="white"
						transform="translate(1.74753 -0.483398)"
					/>
				</clipPath>
				<clipPath id="clip3_38_51">
					<rect
						width="768.233"
						height="141.076"
						fill="white"
						transform="translate(1.74754 26.4619)"
					/>
				</clipPath>
				<clipPath id="clip4_38_51">
					<rect
						width="768.233"
						height="141.076"
						fill="white"
						transform="translate(1.74754 26.4619)"
					/>
				</clipPath>
				<clipPath id="clip5_38_51">
					<rect
						width="768.233"
						height="141.076"
						fill="white"
						transform="translate(1.74754 26.4619)"
					/>
				</clipPath>
				<clipPath id="clip6_38_51">
					<rect
						width="768.233"
						height="141.076"
						fill="white"
						transform="translate(1.74754 26.4619)"
					/>
				</clipPath>
				<clipPath id="clip7_38_51">
					<rect
						width="194.967"
						height="194.967"
						fill="white"
						transform="translate(803.286 -0.483398)"
					/>
				</clipPath>
			</defs>
		</svg>
	),
	pencil: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			className="color-foreground"
			strokeLinejoin="round"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
			<path d="M13.5 6.5l4 4" />
		</svg>
	),
	moon: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			strokeWidth="2"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="color-foreground"
			stroke="currentColor"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
		</svg>
	),
	plus: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			className="color-foreground"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 5l0 14" />
			<path d="M5 12l14 0" />
		</svg>
	),
	sun: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
			<path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
		</svg>
	),
	search: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="text-foreground"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
			<path d="M21 21l-6 -6" />
		</svg>
	),
	logout: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="text-foreground"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
			<path d="M9 12h12l-3 -3" />
			<path d="M18 15l3 -3" />
		</svg>
	),
	spinner: ({ className, ...props }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn(['text-background', className])}
			{...props}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	),

	moodPuzzled: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="dark:text-inherit text-input"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M14.986 3.51a9 9 0 1 0 1.514 16.284c2.489 -1.437 4.181 -3.978 4.5 -6.794" />
			<path d="M10 10h.01" />
			<path d="M14 8h.01" />
			<path d="M12 15c1 -1.333 2 -2 3 -2" />
			<path d="M20 9v.01" />
			<path d="M20 6a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
		</svg>
	),
	userPlus: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="dark:text-inherit text-foreground"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
			<path d="M16 19h6" />
			<path d="M19 16v6" />
			<path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
		</svg>
	),
	users: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="dark:text-inherit text-foreground"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
			<path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
			<path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
			<path d="M17 10h2a2 2 0 0 1 2 2v1" />
			<path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
			<path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
		</svg>
	),
	zoomCancel: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="dark:text-inherit text-input"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
			<path d="M8 8l4 4" />
			<path d="M12 8l-4 4" />
			<path d="M21 21l-6 -6" />
		</svg>
	),
	burger: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="text-foreground"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 6l16 0" />
			<path d="M4 12l16 0" />
			<path d="M4 18l16 0" />
		</svg>
	),
}
