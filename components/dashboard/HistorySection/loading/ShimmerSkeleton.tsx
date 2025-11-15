export function ShimmerSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header with shimmer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative overflow-hidden w-10 h-10 bg-gray-200 rounded-lg">
            <div className="shimmer" />
          </div>
          <div className="space-y-2">
            <div className="relative overflow-hidden w-32 h-6 bg-gray-200 rounded">
              <div className="shimmer" />
            </div>
            <div className="relative overflow-hidden w-48 h-4 bg-gray-200 rounded">
              <div className="shimmer" />
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden w-20 h-9 bg-gray-200 rounded-md">
          <div className="shimmer" />
        </div>
      </div>

      {/* Search bar */}
      <div className="relative overflow-hidden w-full h-10 bg-gray-200 rounded-md">
        <div className="shimmer" />
      </div>

      {/* Shimmer cards */}
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="relative overflow-hidden">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Card content */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative overflow-hidden w-48 h-6 bg-gray-200 rounded">
                      <div className="shimmer" />
                    </div>
                    <div className="relative overflow-hidden w-20 h-6 bg-gray-200 rounded-full">
                      <div className="shimmer" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative overflow-hidden w-full h-4 bg-gray-200 rounded">
                      <div className="shimmer" />
                    </div>
                    <div className="relative overflow-hidden w-4/5 h-4 bg-gray-200 rounded">
                      <div className="shimmer" />
                    </div>
                    <div className="relative overflow-hidden w-3/4 h-4 bg-gray-200 rounded">
                      <div className="shimmer" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {[...Array(5)].map((_, metaIndex) => (
                      <div key={metaIndex} className="flex items-center gap-2">
                        {metaIndex % 2 === 0 ? (
                          <div className="relative overflow-hidden w-4 h-4 bg-gray-200 rounded-full">
                            <div className="shimmer" />
                          </div>
                        ) : (
                          <div className="relative overflow-hidden w-2 h-2 bg-gray-200 rounded-full">
                            <div className="shimmer" />
                          </div>
                        )}
                        <div className="relative overflow-hidden w-16 h-3 bg-gray-200 rounded">
                          <div className="shimmer" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons with staggered animation */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                {[...Array(4)].map((_, btnIndex) => (
                  <div 
                    key={btnIndex}
                    className="relative overflow-hidden flex-1 h-8 bg-gray-200 rounded-md"
                  >
                    <div 
                      className="shimmer" 
                      style={{
                        animationDelay: `${btnIndex * 0.2}s`
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {index < 2 && <div className="border-t border-gray-200 my-4" />}
          </div>
        ))}
      </div>

      <style jsx>{`
        .shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  )
}